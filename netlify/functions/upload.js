const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Parse multipart form data
    const boundary = event.headers['content-type']?.split('boundary=')[1]
    if (!boundary) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No boundary found in content-type' })
      }
    }

    // For Netlify Functions, we'll use a simpler approach
    // In production, you might want to use a service like Cloudinary or AWS S3
    const timestamp = Date.now()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.jpg`
    
    // In a real implementation, you would upload to a cloud storage service
    // For now, we'll return a placeholder URL
    const imageUrl = `https://via.placeholder.com/400x300/cccccc/666666?text=Uploaded+Image`

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        filename,
        url: imageUrl,
        message: 'Image upload simulated successfully. In production, implement actual file upload to cloud storage.'
      })
    }

  } catch (error) {
    console.error('Upload error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Upload failed' })
    }
  }
}

