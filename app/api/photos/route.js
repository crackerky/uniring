import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { photos } from './data';

// 保存ディレクトリ
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

// GET - すべての写真を取得
export async function GET() {
  try {
    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    console.error("写真の取得中にエラーが発生しました:", error);
    return NextResponse.json({ error: "写真の取得に失敗しました" }, { status: 500 });
  }
}

// POST - 新しい写真をアップロード
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 400 });
    }

    // ファイルタイプの検証
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "無効なファイル形式です" }, { status: 400 });
    }

    // メタデータの取得
    const title = formData.get('title') || file.name.split('.')[0];
    const category = formData.get('category') || 'その他';
    const date = formData.get('date') ? new Date(formData.get('date')) : new Date();

    // ファイル名の生成
    const id = uuidv4();
    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${id}.${fileExt}`;
    const filePath = join(UPLOAD_DIR, fileName);

    // ファイルバッファの取得と最適化
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let optimizedBuffer;

    try {
      const sharpInstance = sharp(fileBuffer);
      
      // 画像の基本情報を取得
      const metadata = await sharpInstance.metadata();
      
      // 画像の最適化設定
      let pipeline = sharpInstance
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true
        });

      // フォーマット別の最適化
      if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
      } else if (metadata.format === 'png') {
        pipeline = pipeline.png({ compressionLevel: 9 });
      } else if (metadata.format === 'gif') {
        pipeline = pipeline.gif();
      }

      optimizedBuffer = await pipeline.toBuffer();
    } catch (error) {
      console.error("画像の最適化中にエラーが発生しました:", error);
      optimizedBuffer = fileBuffer; // エラーの場合は元のバッファを使用
    }

    // ファイルサイズの検証（最適化後）
    if (optimizedBuffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "ファイルサイズが大きすぎます" }, { status: 400 });
    }

    // アップロードディレクトリの作成
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    // 最適化された画像を保存
    await writeFile(filePath, optimizedBuffer);

    // メタデータの保存
    const photoData = {
      id,
      filename: file.name,
      fileSize: optimizedBuffer.length,
      fileType: file.type,
      title,
      category,
      date: date.toISOString(),
      url: `/uploads/${fileName}`
    };

    // 写真の配列に追加
    photos.push(photoData);

    return NextResponse.json({ 
      message: "写真が正常にアップロードされました", 
      photo: photoData 
    }, { status: 201 });
  } catch (error) {
    console.error("写真のアップロード中にエラーが発生しました:", error);
    return NextResponse.json({ error: "写真のアップロードに失敗しました" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';