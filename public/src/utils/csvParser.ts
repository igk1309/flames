export interface CoupleData {
  coupleId: string;
  coupleName: string;
  maleName: string;
  femaleName: string;
  maleImage: string;
  femaleImage: string;
  caricatureImage: string;
}

export async function parseCouplesCSV(csvPath: string = '/data/couples.csv'): Promise<CoupleData[]> {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV: ${response.statusText}`);
      return [];
    }

    const csvText = await response.text();
    const lines = csvText.split('\n').filter((line) => line.trim());

    if (lines.length < 2) {
      return [];
    }

    const couples: CoupleData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim());
      if (values.length < 7) continue;

      couples.push({
        coupleId: values[0],
        coupleName: values[1],
        maleName: values[2],
        femaleName: values[3],
        maleImage: values[4],
        femaleImage: values[5],
        caricatureImage: values[6],
      });
    }

    return couples;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}
