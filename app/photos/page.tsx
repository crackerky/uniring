"use client";

import { useState, useRef, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabase";
import type { Photo as PhotoType } from "@/types/supabase";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, Expand, Trash2, Plus, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// 写真の型定義
interface Photo {
  id: string;
  file: File;
  url: string;
  title: string;
  date: Date;
  category: string;
}

// カテゴリーのリスト
const categories = ["イベント", "ワークショップ", "メディア掲載", "その他"];

export default function PhotosPage() {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 初期データの読み込み
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      try {
        const { data: photos, error } = await supabase
          .from('photos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        if (photos) {
          const transformedPhotos = photos.map((photo: PhotoType) => ({
            id: photo.id,
            file: new File([new Blob()], photo.filename, { type: photo.file_type }),
            url: photo.url,
            title: photo.title,
            date: new Date(photo.date),
            category: photo.category,
          }));
          setPhotos(transformedPhotos);
        }
      } catch (error) {
        console.error("写真の取得中にエラーが発生しました:", error);
        toast({
          variant: "destructive",
          title: "エラー",
          description: "写真の読み込みに失敗しました。",
        });
      }
    };

    fetchPhotos();
  }, [toast]);

  // コンポーネントのアンマウント時にObjectURLをクリーンアップ
  useEffect(() => {
    return () => {
      // クリーンアップ関数でObjectURLを解放
      photos.forEach(photo => {
        URL.revokeObjectURL(photo.url);
      });
    };
  }, [photos]);

  // 写真のアップロード処理
  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    let hasErrors = false;

    const processFiles = async () => {
      const newPhotos: Photo[] = [];

      for (const file of Array.from(files)) {
        // ファイル形式のチェック
        if (!validFileTypes.includes(file.type)) {
          hasErrors = true;
          toast({
            variant: "destructive",
            title: "非対応のファイル形式です",
            description: "JPG、PNG、GIF形式のファイルのみアップロードできます。"
          });
          continue;
        }

        try {
          // 画像の圧縮
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };

          const compressedFile = await imageCompression(file, options);

          // FormDataの作成
          const formData = new FormData();
          formData.append('file', compressedFile);
          formData.append('title', file.name.split('.')[0]);
          formData.append('category', 'その他');
          formData.append('date', new Date().toISOString());

          // Supabaseにアップロード
          const fileExt = file.name.split('.').pop()?.toLowerCase();
          const fileName = `${Date.now()}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('photos')
            .upload(fileName, compressedFile);

          if (uploadError) throw uploadError;

          // 公開URLの取得
          const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(fileName);

          // メタデータをデータベースに保存
          const { data: photoData, error: insertError } = await supabase
            .from('photos')
            .insert({
              filename: file.name,
              file_size: compressedFile.size,
              file_type: compressedFile.type,
              title: file.name.split('.')[0],
              category: 'その他',
              date: new Date().toISOString(),
              url: publicUrl
            })
            .select()
            .single();

          if (insertError) throw insertError;

          // 写真オブジェクトの作成
          newPhotos.push({
            id: photoData.id,
            file: compressedFile,
            url: publicUrl,
            title: photoData.title,
            date: new Date(photoData.date),
            category: photoData.category
          });

        } catch (error) {
          hasErrors = true;
          toast({
            variant: "destructive",
            title: "アップロード中にエラーが発生しました",
            description: "写真の処理中に問題が発生しました。もう一度お試しください。"
          });
        }
      }

      if (newPhotos.length > 0) {
        setPhotos(prev => [...prev, ...newPhotos]);
        toast({
          title: "アップロード完了",
          description: `${newPhotos.length}枚の写真がアップロードされました。`
        });
      } else if (!hasErrors) {
        toast({
          variant: "destructive",
          title: "アップロードエラー",
          description: "アップロードする写真がありませんでした。"
        });
      }
    };

    processFiles();
  };

  // ドラッグ&ドロップのイベントハンドラー
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handlePhotoUpload(files);
  };

  // 写真の削除
  const handleDeletePhoto = (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (photo) {
      const deletePhoto = async () => {
        // ストレージからファイルを削除
        const fileName = photo.url.split('photos/')[1]?.split('?')[0];
        if (!fileName) throw new Error('ファイル名の取得に失敗しました');

        const { error: storageError } = await supabase.storage
          .from('photos')
          .remove([fileName]);

        if (storageError) throw storageError;

        // データベースから写真を削除
        const { error: deleteError } = await supabase
          .from('photos')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;

        // 成功したら状態を更新
        setPhotos(photos.filter(p => p.id !== id));
        
        if (selectedPhoto?.id === id) {
          setSelectedPhoto(null);
        }
        
        toast({
          title: "写真を削除しました",
          description: "写真が正常に削除されました。"
        });
      };

      deletePhoto().catch(error => {
        toast({
          variant: "destructive",
          title: "エラー",
          description: "写真の削除に失敗しました。"
        });
      });
    }
  };

  // 写真の更新
  const handleUpdatePhoto = (updatedPhoto: Photo) => {
    const updatePhoto = async () => {
      try {
        const { error } = await supabase
          .from('photos')
          .update({
            title: updatedPhoto.title,
            category: updatedPhoto.category,
            date: updatedPhoto.date.toISOString()
          })
          .eq('id', updatedPhoto.id);

        if (error) throw error;

        setPhotos(photos.map(p => p.id === updatedPhoto.id ? {...updatedPhoto} : p));
        setSelectedPhoto(null);
        
        toast({
          title: "写真を更新しました",
          description: "写真の情報が正常に更新されました。"
        });
      } catch (error) {
        console.error("写真の更新中にエラーが発生しました:", error);
        toast({
          variant: "destructive",
          title: "エラー",
          description: "写真の更新に失敗しました。"
        });
      }
    };

    updatePhoto();
  };

  // 写真の詳細を表示する際のハンドラー
  const handleSelectPhoto = (photo: Photo) => {
    // 選択した写真のディープコピーを作成して状態を更新
    setSelectedPhoto({...photo, date: new Date(photo.date)});
  };

  // カテゴリーでフィルタリングされた写真
  const filteredPhotos = currentCategory 
    ? photos.filter(p => p.category === currentCategory)
    : photos;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-6"
          >
            写真ギャラリー
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-12"
          >
            活動の様子や実績を写真でご覧いただけます
          </motion.p>

          {/* 写真のアップロードエリア */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div 
              className={`border-2 border-dashed p-8 rounded-lg text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/20 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => handlePhotoUpload(e.target.files)}
              />
              <ImagePlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                ここに写真をドラッグ&ドロップ
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                または、クリックしてファイルを選択してください<br />
                対応形式: JPG, PNG, GIF (最大5MB)
              </p>
              <Button type="button">
                <Upload className="mr-2 h-4 w-4" />
                写真をアップロード
              </Button>
            </div>
          </motion.div>

          {/* カテゴリーフィルター */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap gap-2"
          >
            <Button
              type="button"
              variant={currentCategory === null ? "default" : "outline"}
              onClick={() => setCurrentCategory(null)}
              className="mb-2"
            >
              すべて
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={currentCategory === category ? "default" : "outline"}
                onClick={() => setCurrentCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* 写真ギャラリー */}
          {filteredPhotos.length > 0 ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card rounded-lg overflow-hidden shadow-sm border relative group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white mr-2"
                        onClick={() => handleSelectPhoto(photo)}
                        type="button"
                      >
                        <Expand className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhoto(photo.id);
                        }}
                        type="button"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">{photo.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {photo.category} - {photo.date.toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 text-muted-foreground"
            >
              <p className="mb-4">写真がありません</p>
              <Button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="mr-2 h-4 w-4" />
                写真を追加する
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 写真の詳細ダイアログ */}
      <Dialog 
        open={!!selectedPhoto} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPhoto(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>写真の詳細</DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-square">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">タイトル</Label>
                  <Input
                    id="title"
                    value={selectedPhoto.title}
                    onChange={(e) => setSelectedPhoto({
                      ...selectedPhoto,
                      title: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">カテゴリー</Label>
                  <select
                    id="category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={selectedPhoto.category}
                    onChange={(e) => setSelectedPhoto({
                      ...selectedPhoto,
                      category: e.target.value
                    })}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">日付</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedPhoto.date.toISOString().split('T')[0]}
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedPhoto({
                          ...selectedPhoto,
                          date: new Date(e.target.value)
                        });
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ファイル情報</Label>
                  <p className="text-sm text-muted-foreground">
                    サイズ: {Math.round(selectedPhoto.file.size / 1024)} KB<br />
                    形式: {selectedPhoto.file.type}
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <DialogClose asChild>
                    <Button 
                      type="button"
                      variant="outline"
                    >
                      キャンセル
                    </Button>
                  </DialogClose>
                  <Button 
                    type="button"
                    onClick={() => handleUpdatePhoto(selectedPhoto)}
                  >
                    保存
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}