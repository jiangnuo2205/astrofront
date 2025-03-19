import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  try {
    const data = await request.json();
    
    // 设置保存路径
    const saveDirectory = path.join(process.cwd(), 'src', 'content', 'news');
    const filePath = path.join(saveDirectory, data.fileName);
    
    // 确保目录存在
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }
    
    // 写入文件
    fs.writeFileSync(filePath, data.content);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('保存文件时出错:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}