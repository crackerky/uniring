import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // 写真のメタデータを取得
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!photo) {
      return NextResponse.json({ error: "写真が見つかりません" }, { status: 404 });
    }

    // ストレージからファイルを削除
    const fileName = photo.url.split('/').pop();
    const { error: storageError } = await supabase
      .storage
      .from('photos')
      .remove([fileName]);

    if (storageError) throw storageError;

    // データベースから写真を削除
    const { error: deleteError } = await supabase
      .from('photos')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
    
    return NextResponse.json({ 
      message: "写真が正常に削除されました" 
    }, { status: 200 });
  } catch (error) {
    console.error("写真の削除中にエラーが発生しました:", error);
    return NextResponse.json({ error: "写真の削除に失敗しました" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';