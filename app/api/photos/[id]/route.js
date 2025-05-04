import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import fs from 'fs/promises';
import { photos } from '../data';

// UPLOAD_DIRの設定
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

// DELETE - 写真を削除
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // 写真が存在するかチェック
    const photoIndex = photos.findIndex(p => p.id === id);
    if (photoIndex === -1) {
      return NextResponse.json({ error: "写真が見つかりません" }, { status: 404 });
    }
    
    const photo = photos[photoIndex];
    
    // ファイルパスの取得
    const fileName = photo.url.split('/').pop();
    const filePath = join(UPLOAD_DIR, fileName);
    
    // ファイルが存在するか確認してから削除
    try {
      await fs.access(filePath);
      await unlink(filePath);
    } catch (fileError) {
      console.warn(`ファイルが見つかりませんでした: ${filePath}`, fileError);
      // ファイルが見つからなくても処理を続行
    }
    
    // 配列から写真を削除
    photos.splice(photoIndex, 1);
    
    return NextResponse.json({ 
      message: "写真が正常に削除されました" 
    }, { status: 200 });
  } catch (error) {
    console.error("写真の削除中にエラーが発生しました:", error);
    return NextResponse.json({ error: "写真の削除に失敗しました" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';