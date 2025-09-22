variable "key_name" {
  description = "Name of the AWS key pair"
  type        = string
}

variable "instance_type" {
  default     = "t2.medium"
  description = "EC2 instance type"
}

variable "ami_id" {
  description = "AMI ID for Ubuntu 22.04"
  default     = "ami-0f58c7d8c0e1e5e0f" # Update if needed
}
