import { Client } from 'minio'
import { 
  MINIO_ENDPOINT, 
  MINIO_ACCESS_KEY, 
  MINIO_SECRET_KEY, 
  MINIO_BUCKET 
} from '../lib/constants'

const bucket = MINIO_BUCKET || 'medusa-media'

async function fixBucketPolicy() {
  console.log('🔧 Fixing MinIO bucket policy...')
  console.log(`Endpoint: ${MINIO_ENDPOINT}`)
  console.log(`Bucket: ${bucket}`)

  if (!MINIO_ENDPOINT || !MINIO_ACCESS_KEY || !MINIO_SECRET_KEY) {
    console.error('❌ Missing MinIO environment variables!')
    process.exit(1)
  }

  // Parse endpoint
  const [host, port] = MINIO_ENDPOINT.split(':')
  const useSSL = !MINIO_ENDPOINT.includes('localhost') && !MINIO_ENDPOINT.includes('127.0.0.1')

  const client = new Client({
    endPoint: host,
    port: port ? parseInt(port) : (useSSL ? 443 : 9000),
    useSSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY
  })

  try {
    // Check if bucket exists
    const exists = await client.bucketExists(bucket)
    if (!exists) {
      console.error(`❌ Bucket "${bucket}" does not exist!`)
      process.exit(1)
    }

    console.log(`✅ Bucket "${bucket}" exists`)

    // Get current policy
    try {
      const currentPolicy = await client.getBucketPolicy(bucket)
      console.log('📄 Current policy:', currentPolicy)
    } catch (err) {
      console.log('⚠️  No existing policy found')
    }

    // Set public read policy
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicRead',
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucket}/*`]
        }
      ]
    }

    await client.setBucketPolicy(bucket, JSON.stringify(policy))
    console.log('✅ Public read policy applied successfully!')

    // Verify policy
    const newPolicy = await client.getBucketPolicy(bucket)
    console.log('✅ Verified new policy:', newPolicy)

    console.log('\n🎉 Done! All files in the bucket should now be publicly accessible.')
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code) {
      console.error('Error code:', error.code)
    }
    process.exit(1)
  }
}

fixBucketPolicy()
