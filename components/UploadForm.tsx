'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UploadSchema } from '@/lib/zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {
  voiceOptions,
  voiceCategories,
  DEFAULT_VOICE,
  MAX_FILE_SIZE,
  ACCEPTED_PDF_TYPES,
  MAX_IMAGE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from '@/lib/constants'
import LoadingOverlay from '@/components/LoadingOverlay'
import { cn } from '@/lib/utils'

type FormValues = z.infer<typeof UploadSchema>

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pdfName, setPdfName] = useState<string | null>(null)
  const [coverName, setCoverName] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: '',
      author: '',
      voice: DEFAULT_VOICE,
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    console.log(values)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'pdfFile' | 'coverImage'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      if (field === 'pdfFile') {
        if (file.size > MAX_FILE_SIZE) {
          form.setError('pdfFile', { message: 'File is too large (max 50MB)' })
          return
        }
        if (!ACCEPTED_PDF_TYPES.includes(file.type)) {
          form.setError('pdfFile', { message: 'Only PDF files are allowed' })
          return
        }
        setPdfName(file.name)
        form.setValue('pdfFile', file)
        form.clearErrors('pdfFile')
      } else {
        if (file.size > MAX_IMAGE_SIZE) {
          form.setError('coverImage', { message: 'Image is too large (max 10MB)' })
          return
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          form.setError('coverImage', { message: 'Unsupported image type' })
          return
        }
        setCoverName(file.name)
        form.setValue('coverImage', file)
        form.clearErrors('coverImage')
      }
    }
  }

  const removeFile = (field: 'pdfFile' | 'coverImage') => {
    if (field === 'pdfFile') {
      setPdfName(null)
      form.setValue('pdfFile', undefined)
    } else {
      setCoverName(null)
      form.setValue('coverImage', undefined)
    }
  }

  return (
    <div className="new-book-wrapper">
      {isSubmitting && <LoadingOverlay />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* PDF File Upload */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={() => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <div className={cn("upload-dropzone", pdfName && "upload-dropzone-uploaded")}>
                    {!pdfName ? (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full py-10">
                        <Upload className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">Click to upload PDF</span>
                        <span className="upload-dropzone-hint">PDF file (max 50MB)</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'pdfFile')}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between w-full p-4">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Upload className="upload-dropzone-icon h-5 w-5" />
                          <span className="upload-dropzone-text truncate">{pdfName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('pdfFile')}
                          className="upload-dropzone-remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload */}
          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                <FormControl>
                  <div className={cn("upload-dropzone", coverName && "upload-dropzone-uploaded")}>
                    {!coverName ? (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full py-10">
                        <ImageIcon className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">Click to upload cover image</span>
                        <span className="upload-dropzone-hint">Leave empty to auto-generate from PDF</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'coverImage')}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between w-full p-4">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <ImageIcon className="upload-dropzone-icon h-5 w-5" />
                          <span className="upload-dropzone-text truncate">{coverName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('coverImage')}
                          className="upload-dropzone-remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Rich Dad Poor Dad" 
                    className="form-input" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Input */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Robert Kiyosaki" 
                    className="form-input" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-3">Male Voices</p>
                      <div className="voice-selector-options">
                        {voiceCategories.male.map((voiceKey) => {
                          const voice = voiceOptions[voiceKey as keyof typeof voiceOptions]
                          const isSelected = field.value === voiceKey
                          return (
                            <label
                              key={voiceKey}
                              className={cn(
                                "voice-selector-option cursor-pointer",
                                isSelected && "voice-selector-option-selected"
                              )}
                            >
                              <RadioGroupItem value={voiceKey} className="sr-only" />
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0 mt-1",
                                  isSelected && "border-[#663820]"
                                )}>
                                  {isSelected && <div className="h-2 w-2 rounded-full bg-[#663820]" />}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900">{voice.name}</p>
                                  <p className="text-xs text-gray-500">{voice.description}</p>
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-3">Female Voices</p>
                      <div className="voice-selector-options">
                        {voiceCategories.female.map((voiceKey) => {
                          const voice = voiceOptions[voiceKey as keyof typeof voiceOptions]
                          const isSelected = field.value === voiceKey
                          return (
                            <label
                              key={voiceKey}
                              className={cn(
                                "voice-selector-option cursor-pointer",
                                isSelected && "voice-selector-option-selected"
                              )}
                            >
                              <RadioGroupItem value={voiceKey} className="sr-only" />
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0 mt-1",
                                  isSelected && "border-[#663820]"
                                )}>
                                  {isSelected && <div className="h-2 w-2 rounded-full bg-[#663820]" />}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900">{voice.name}</p>
                                  <p className="text-xs text-gray-500">{voice.description}</p>
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="form-btn w-full bg-[#663820] hover:bg-[#5a311c] text-white font-serif py-6 text-lg"
            disabled={isSubmitting}
          >
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UploadForm
