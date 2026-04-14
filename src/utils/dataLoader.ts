import { parseCouplesCSV, type CoupleData } from './csvParser';
import { supabase } from './supabase';

export interface CoupleDataWithImages extends CoupleData {
  maleImageUrl: string;
  femaleImageUrl: string;
  caricatureImageUrl: string;
}

async function loadFromCSV(): Promise<CoupleDataWithImages[]> {
  try {
    const csvData = await parseCouplesCSV('/data/couples.csv');
    return csvData.map((couple) => ({
      ...couple,
      maleImageUrl: `/images/male/${couple.maleImage}`,
      femaleImageUrl: `/images/female/${couple.femaleImage}`,
      caricatureImageUrl: `/images/caricature/${couple.caricatureImage}`,
    }));
  } catch (error) {
    console.error('Error loading from CSV:', error);
    return [];
  }
}

async function loadFromDatabase(): Promise<CoupleDataWithImages[]> {
  try {
    const { data, error } = await supabase.from('couples').select('*');
    if (error || !data) return [];

    return data.map((couple) => ({
      coupleId: couple.couple_id ?? couple.id,
      coupleName: couple.couple_name,
      maleName: couple.male_name,
      femaleName: couple.female_name,
      maleImage: couple.male_image_filename ?? couple.male_image_path ?? '',
      femaleImage: couple.female_image_filename ?? couple.female_image_path ?? '',
      caricatureImage: couple.caricature_image_filename ?? couple.caricature_image_path ?? '',
      maleImageUrl: couple.male_image_url
        ? couple.male_image_url
        : supabase.storage.from('couple_images').getPublicUrl(couple.male_image_path ?? '').data.publicUrl,
      femaleImageUrl: couple.female_image_url
        ? couple.female_image_url
        : supabase.storage.from('couple_images').getPublicUrl(couple.female_image_path ?? '').data.publicUrl,
      caricatureImageUrl: couple.caricature_image_url
        ? couple.caricature_image_url
        : supabase.storage.from('couple_images').getPublicUrl(couple.caricature_image_path ?? '').data.publicUrl,
    }));
  } catch (error) {
    console.error('Error loading from database:', error);
    return [];
  }
}

export async function loadCouples(useCSV: boolean = true): Promise<CoupleDataWithImages[]> {
  if (useCSV) {
    const csvData = await loadFromCSV();
    if (csvData.length > 0) return csvData;
  }
  return loadFromDatabase();
}
