'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from 'next-themes'
import { Loader2, SunMoon } from 'lucide-react'
import { useState, useEffect } from 'react'

export const themeFormSchema = z.object({
  theme: z.string(),
})

export function AppearanceForm() {
  const { theme, setTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Esperar o componente para ai sim acessar o tema. Criado para ajustar o erro de hydration. Isso também evita um flash de tema
  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<z.infer<typeof themeFormSchema>>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: {
      theme: mounted ? theme || 'light' : 'light',
    },
  })

  // Atualiza o form sempre que o tema muda
  useEffect(() => {
    if (mounted && theme) {
      form.setValue('theme', theme)
    }
  }, [mounted, theme, form])

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true)
    try {
      setTheme(data.theme as 'light' | 'dark')
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'Ops! Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }

    toast({
      title: 'Success',
      description: 'Your theme has been updated successfully.',
      variant: 'success',
    })
  })

  if (!mounted) {
    return (
      <div className="max-h-screen p-6 opacity-0">
        <div className="h-[400px]"></div>
      </div>
    )
  }

  return (
    <div className="max-h-screen p-6">
      <Form {...form}>
        <div className="max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">User settings</h1>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <SunMoon className="h-5 w-5" />
              <h2>Change your theme</h2>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid max-w-md grid-cols-2 gap-8 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-text">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Light
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-text">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Dark
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating theme...
              </>
            ) : (
              'Update theme'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
