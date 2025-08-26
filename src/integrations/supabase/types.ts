export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      course_enrollments: {
        Row: {
          course_id: string | null
          enrolled_at: string
          id: string
          student_id: string | null
          transaction_hash: string | null
        }
        Insert: {
          course_id?: string | null
          enrolled_at?: string
          id?: string
          student_id?: string | null
          transaction_hash?: string | null
        }
        Update: {
          course_id?: string | null
          enrolled_at?: string
          id?: string
          student_id?: string | null
          transaction_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          blockchain_created: boolean | null
          contract_course_id: number | null
          created_at: string
          description: string | null
          id: string
          instructor_id: string | null
          ipfs_hash: string | null
          is_active: boolean | null
          price_display: number | null
          price_wei: string | null
          title: string
          updated_at: string
        }
        Insert: {
          blockchain_created?: boolean | null
          contract_course_id?: number | null
          created_at?: string
          description?: string | null
          id?: string
          instructor_id?: string | null
          ipfs_hash?: string | null
          is_active?: boolean | null
          price_display?: number | null
          price_wei?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          blockchain_created?: boolean | null
          contract_course_id?: number | null
          created_at?: string
          description?: string | null
          id?: string
          instructor_id?: string | null
          ipfs_hash?: string | null
          is_active?: boolean | null
          price_display?: number | null
          price_wei?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_verified_scholar: boolean | null
          reputation_points: number | null
          updated_at: string
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_verified_scholar?: boolean | null
          reputation_points?: number | null
          updated_at?: string
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_verified_scholar?: boolean | null
          reputation_points?: number | null
          updated_at?: string
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      scholar_verifications: {
        Row: {
          created_at: string
          id: string
          metadata: string | null
          scholar_id: string | null
          transaction_hash: string | null
          verification_status: string | null
          verified_at: string | null
          verifier_address: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: string | null
          scholar_id?: string | null
          transaction_hash?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verifier_address?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: string | null
          scholar_id?: string | null
          transaction_hash?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verifier_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scholar_verifications_scholar_id_fkey"
            columns: ["scholar_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webinar_nfts: {
        Row: {
          id: string
          metadata_uri: string | null
          minted_at: string
          owner_id: string | null
          token_id: number | null
          transaction_hash: string | null
          webinar_date: string | null
          webinar_title: string
        }
        Insert: {
          id?: string
          metadata_uri?: string | null
          minted_at?: string
          owner_id?: string | null
          token_id?: number | null
          transaction_hash?: string | null
          webinar_date?: string | null
          webinar_title: string
        }
        Update: {
          id?: string
          metadata_uri?: string | null
          minted_at?: string
          owner_id?: string | null
          token_id?: number | null
          transaction_hash?: string | null
          webinar_date?: string | null
          webinar_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "webinar_nfts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      zakat_donations: {
        Row: {
          amount_display: number | null
          amount_wei: string
          donated_at: string
          donor_id: string | null
          id: string
          transaction_hash: string | null
        }
        Insert: {
          amount_display?: number | null
          amount_wei: string
          donated_at?: string
          donor_id?: string | null
          id?: string
          transaction_hash?: string | null
        }
        Update: {
          amount_display?: number | null
          amount_wei?: string
          donated_at?: string
          donor_id?: string | null
          id?: string
          transaction_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zakat_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
