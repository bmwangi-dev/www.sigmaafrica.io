import type { SocialIconType } from '@/components/ui/SocialIcons';

export interface TeamSocial {
  type: SocialIconType;
  url: string;
}

export interface TeamData {
  id: number;
  name: string;
  contact_no: string;
  email: string;
  department: string;
  position?: string | null;
  image_path?: string | null;
  socials?: TeamSocial[] | null;
  is_active: boolean;
  sort_order: number;
  created_at?: string | null;
  updated_at?: string | null;
}
