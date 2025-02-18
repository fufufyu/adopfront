import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Upload } from "lucide-react"

interface FileUploadProps {
  label: string
  accept: string
  onChange: (file: File | null) => void
  error?: string
}

const FileUpload: React.FC<FileUploadProps> = ({ label, accept, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      onChange(file)
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    } else {
      onChange(null)
      setPreview(null)
    }
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {preview && (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <Input type="file" accept={accept} onChange={handleFileChange} />
            {!preview && <Upload className="h-5 w-5 text-muted-foreground" />}
          </div>
        </div>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  )
}

export default FileUpload

