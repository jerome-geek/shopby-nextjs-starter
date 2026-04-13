# Admin Infrastructure (S3 + CloudFront)

이 폴더는 `apps/admin` 서비스를 위한 AWS 인프라(S3 + CloudFront)를 정의합니다.

## 구성 요소 (Resources)
- **S3 Bucket**: 프라이빗 정적 웹사이트 호스팅용 저장소.
- **CloudFront Distribution**: S3 데이터를 전 세계로 배포하며 HTTPS를 지원합니다.
- **Origin Access Control (OAC)**: S3 버킷을 외부에 공개하지 않고 CloudFront만 접근 가능하도록 보안을 강화합니다.
- **Custom Error Response**: React Router와 같은 SPA의 클라이언트 사이드 라우팅을 위해 403, 404 에러 시 `index.html`을 반환하도록 설정되어 있습니다.

## 사전 준비 (Prerequisites)
1. **Terraform 설치 (macOS 기준)**:
   ```bash
   brew tap hashicorp/tap
   brew install hashicorp/tap/terraform
   ```
2. **AWS CLI 설치 및 자격 증명 설정**:
   ```bash
   brew install awscli
   aws configure
   ```
   *(Access Key ID, Secret Access Key, Region(ap-northeast-2) 입력 필요)*

## 실행 방법 (Deployment Steps)

### 1. 초기화 (Initialize)
테라폼 프로바이더 및 모듈을 다운로드합니다.
```bash
terraform init
```

### 2. 계획 확인 (Plan)
생성될 리소스를 미리 확인합니다.
```bash
terraform plan
```

### 3. 실제 생성 (Apply)
확인 후 실제 AWS에 리소스를 배포합니다.
```bash
terraform apply
```
*실행 후 화면에 출력되는 `s3_bucket_name`과 `cloudfront_distribution_id`를 기록해 두세요.*

### 4. 리소스 삭제 (Destroy)
테스트 완료 후 생성한 모든 리소스를 삭제하려면 실행합니다.
```bash
terraform destroy
```

## 배포 후 작업 (Post-Deployment)
Terraform 실행 결과로 나온 값들을 GitHub Repository의 **Settings > Secrets and variables > Actions**에 등록하세요.

- `AWS_ACCESS_KEY_ID`: IAM 사용자 액세스 키
- `AWS_SECRET_ACCESS_KEY`: IAM 사용자 시크릿 키
- `AWS_REGION`: 리전 (예: `ap-northeast-2`)
- `S3_BUCKET_NAME`: `terraform apply` 결과값
- `CLOUDFRONT_DISTRIBUTION_ID`: `terraform apply` 결과값
