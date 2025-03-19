// src/pages/api/delete-news.js
import fs from 'node:fs';
import path from 'node:path';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { slug } = data;
    
    if (!slug) {
      return new Response('缺少必要参数', { status: 400 });
    }
    
    // 找到对应的文件路径
    const contentDir = path.join(process.cwd(), 'src/content/news');
    const filePath = path.join(contentDir, `${slug}.md`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return new Response('文件不存在', { status: 404 });
    }
    
    // 删除文件
    fs.unlinkSync(filePath);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('删除文件时出错:', error);
    return new Response(`服务器错误: ${error.message}`, { status: 500 });
  }
}