import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  contract_course_id: number;
  instructor_id: string;
  title: string;
  description: string;
  ipfs_hash: string;
  price_wei: string;
  price_display: number;
  is_active: boolean;
  blockchain_created: boolean;
  created_at: string;
  updated_at: string;
}

export function useCourseManager(walletAddress?: string) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts(walletAddress);
  const { toast } = useToast();

  const fetchCourses = async () => {
    if (!contracts.courseManager) return;

    try {
      setLoading(true);
      
      // Fetch from database first
      const { data: dbCourses } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true);

      setCourses(dbCourses || []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast({
        title: 'Failed to Load Courses',
        description: 'Could not fetch course data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (title: string, description: string, ipfsHash: string, priceEth: string) => {
    if (!contracts.courseManager || !walletAddress) {
      toast({
        title: 'Contract Not Available',
        description: 'Course manager contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const priceWei = ethers.parseEther(priceEth);
      const tx = await contracts.courseManager.createCourse(title, ipfsHash, priceWei);
      
      toast({
        title: 'Transaction Submitted',
        description: 'Course creation transaction submitted',
      });

      const receipt = await tx.wait();
      
      // Extract course ID from event logs
      const courseEvent = receipt.logs.find((log: any) => log.fragment?.name === 'CourseCreated');
      const courseId = courseEvent ? Number(courseEvent.args[0]) : null;

      // Get profile ID first
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', walletAddress)
        .single();

      // Store in database
      const { error } = await supabase
        .from('courses')
        .insert({
          contract_course_id: courseId,
          instructor_id: profile?.id,
          title: title,
          description: description,
          ipfs_hash: ipfsHash,
          price_wei: priceWei.toString(),
          price_display: parseFloat(priceEth),
          blockchain_created: true,
        });

      if (error) {
        console.error('Failed to store course:', error);
      }

      toast({
        title: 'Course Created',
        description: 'Course successfully created on blockchain',
      });

      fetchCourses();
    } catch (error: any) {
      console.error('Failed to create course:', error);
      toast({
        title: 'Course Creation Failed',
        description: error.message || 'Failed to create course',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: number, coursePriceWei: string) => {
    if (!contracts.courseManager || !contracts.eduToken || !walletAddress) {
      toast({
        title: 'Contract Not Available',
        description: 'Course manager contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      // First approve the token transfer
      const approveTx = await contracts.eduToken.approve(
        await contracts.courseManager.getAddress(),
        coursePriceWei
      );
      
      toast({
        title: 'Approval Submitted',
        description: 'Token approval transaction submitted',
      });
      
      await approveTx.wait();
      
      // Then enroll
      const enrollTx = await contracts.courseManager.enroll(courseId);
      
      toast({
        title: 'Enrollment Submitted',
        description: 'Course enrollment transaction submitted',
      });

      const receipt = await enrollTx.wait();

      // Get profile ID for enrollment
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', walletAddress)
        .single();

      // Store enrollment in database
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          student_id: profile?.id,
          course_id: courseId.toString(),
          transaction_hash: receipt.hash,
        });

      if (error) {
        console.error('Failed to store enrollment:', error);
      }

      toast({
        title: 'Enrollment Successful',
        description: 'Successfully enrolled in course',
      });

      fetchCourses();
    } catch (error: any) {
      console.error('Failed to enroll:', error);
      toast({
        title: 'Enrollment Failed',
        description: error.message || 'Failed to enroll in course',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [contracts.courseManager, walletAddress]);

  return {
    courses,
    userCourses,
    loading,
    createCourse,
    enrollInCourse,
    fetchCourses,
  };
}