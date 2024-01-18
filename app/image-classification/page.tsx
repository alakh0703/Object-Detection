"use client"
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ImageIcon, Loader2, ScanSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};
interface DetectionResult {
    [key: string]: number;
}

const ImageClassificationPage = (props: Props) => {
    const [url, setUrl] = useState<string>("");
    const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function uploadFiles(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        setLoading(true);
        if (formData.get("files") === null) return alert("Please upload an image");

        try {
            const response = await axios.post("/api/detect-objects", formData);
            setUrl(response.data.url);
            const jsonData = JSON.parse(response.data.label) as DetectionResult;
            console.log(jsonData)
            setDetectionResult(jsonData);
        } catch (error) {
            alert("Please upload an image");
            console.error("Error uploading files:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="flex flex-col items-center justify-start p-8 gap-8 bg-gray-100 h-[100vh]">
            {/* Left Column: Image Upload and Display */}
            <div className="flex flex-col items-center gap-4 w-full md:w-2/3 h-full">
                <form onSubmit={uploadFiles} className="flex flex-col items-center gap-4">
                    <ImageIcon className="text-blue-500" size={24} />
                    <Input name="files" type="file" className="p-2 border border-gray-300 rounded" />
                    <Button disabled={loading} type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
                        {loading ? <Loader2 className="animate-spin" /> : <ScanSearch size={20} />}
                    </Button>
                </form>

                {url && (
                    <div className="w-full  flex justify-center mt-[50px] md:w-3/4">
                        <Image src={url} width={400} height={400} alt="uploaded image" className="rounded-lg shadow-md" />
                        <Link href={url} className={cn(buttonVariants({ variant: "ghost" }), "text-xs text-muted-foreground")}></Link>
                    </div>
                )}
            </div>

            {/* Right Column: Table Display */}
            {/* Right Column: Table Display */}
            <div className="flex flex-col justify-center w-full md:w-1/3">
                {Object.keys(detectionResult || {}).length > 0 && (
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="text-xl font-bold mb-4">Detected Labels:</p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Label</th>
                                    <th className="text-left">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(!detectionResult).map(([label, count]) => (
                                    <tr key={label}>
                                        <td>{label}</td>
                                        <td>{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </main>
    );
};

export default ImageClassificationPage;
