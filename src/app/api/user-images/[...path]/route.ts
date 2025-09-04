import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filename = params.path.join('/');
    console.log(filename);
    // Construir o caminho do arquivo
    const filePath = join(process.cwd(), 'public', 'user_images', filename);
    console.log(filePath);
    // Ler o arquivo
    const fileBuffer = await readFile(filePath);
    
    // Determinar o tipo de conteúdo baseado na extensão
    const extension = filename.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      default:
        contentType = 'application/octet-stream';
    }
    
    // Retornar a imagem com headers apropriados
    return new NextResponse(fileBuffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache por 1 dia
        'Content-Length': fileBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('Erro ao servir imagem:', error);
    
    // Se a imagem não existir, retornar a imagem padrão
    try {
      const defaultImagePath = join(process.cwd(), 'public', 'user_images', 'default_user_profilepic.png');
      const defaultImageBuffer = await readFile(defaultImagePath);
      
      return new NextResponse(defaultImageBuffer as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400',
          'Content-Length': defaultImageBuffer.length.toString(),
        },
      });
    } catch (defaultError) {
      console.error('Erro ao carregar imagem padrão:', defaultError);
      return new NextResponse('Imagem não encontrada', { status: 404 });
    }
  }
}
