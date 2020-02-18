interface listObjectItem {
  description: string;
  name: string;
  year_from: string;
  year_to: string;
  _id: string;
}

interface userDetail {
  user_id: string;
  name: string;
  account_type: 0 | 1 | 2;
  headline: string;
  original: string;
  thumb: string;
  username: string;
  type: string[];
}

interface address {
  address_city: string;
  address_country: number;
  address_state: number;
  house: string;
  landmark: string;
  pincode: string;
  street: string;
}

interface presence {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface Profile {
  account_type: 0 | 1 | 2;
  _id: string;
  birthday: string;
  certification: listObjectItem[];
  coaching: listObjectItem[];
  college: listObjectItem[];
  award: listObjectItem[];
  specialisation: listObjectItem[];
  publication: listObjectItem[];
  internship: listObjectItem[];
  teaching: listObjectItem[];
  contact: string;
  count_referrals: number;
  country: string;
  exam: string[];
  hometown: string;
  latestedu: string;
  state: string;
  subject: string[];
  summary: string;
  count_connections: number;
  count_groups: number;
  count_posts: number;
  count_profileviews: number;
  count_profileviews_fake: number;
  date_of_joining: number;
  classes_teaching: string[];
  userdetail: userDetail;
  address: address;
}
