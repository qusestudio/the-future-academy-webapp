import {NextRequest, NextResponse} from "next/server";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

interface UploadRequest {
    fileName: string;
    fileType: string;
}

export async function POST(request: NextRequest) {
    try {
        const {fileName, fileType}: UploadRequest = await request.json();
        const s3Client = new S3Client({ region: "af-south-1" });
        const fileKey = `lessons/${Date.now()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: "the-future-academy-bucket",
            Key: fileKey,
            ContentType: fileType,
        })

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

        return NextResponse.json({ uploadUrl, fileKey });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}