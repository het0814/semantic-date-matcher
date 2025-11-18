export interface Profile {
  id?: string;
  userId?: string;
  _id?: string;
  moorcheh_doc_id?: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  about: string;
  looking_for: string;
  interests: string[];
}

export interface Match extends Profile {
  similarity?: number;
  score?: number;
}

export interface CreateProfileData {
  name: string;
  age: number;
  gender: string;
  location: string;
  about: string;
  looking_for: string;
  interests: string[];
}
