terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS 리전"
  # TODO: 사용자의 AWS 환경에 맞는 리전으로 변경하세요 (예: ap-northeast-2)
  default     = "ap-northeast-2"
}

variable "project_name" {
  description = "프로젝트 이름 (버킷 명칭 등에 사용)"
  # TODO: S3 버킷 이름에 사용될 고유 명칭을 입력하세요 (버킷 이름은 중복이 불가하므로 유니크해야 합니다.)
  default     = "shopby-admin"
}
