#!/usr/bin/env bash

awslocal s3 mb s3://testbucket
echo "List of S3 buckets:"
echo "-------------------------------"
awslocal s3 ls

awslocal sqs create-queue --queue-name test_queue
echo "List of SQS Queues:"
echo "-------------------------------"
awslocal sqs list-queues
