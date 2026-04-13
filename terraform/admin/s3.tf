resource "aws_s3_bucket" "admin_bucket" {
  bucket = "${var.project_name}-static-deploy"

  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "admin_bucket_block" {
  bucket = aws_s3_bucket.admin_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "admin_bucket_policy" {
  bucket = aws_s3_bucket.admin_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "s3:GetObject"
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.admin_bucket.arn}/*"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.admin_distribution.arn
          }
        }
      }
    ]
  })
}
