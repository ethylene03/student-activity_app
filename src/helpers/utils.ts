import type { ApiError } from '@/models/global'

function isError(obj: object): obj is ApiError {
  return Array.isArray((obj as ApiError)?.error)
}

function debounce(fun: () => void, delay = 300): () => void {
  let timer: ReturnType<typeof setTimeout>

  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => fun(), delay)
  }
}

function formatDate(date?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date || '').toLocaleDateString('en-PH', options)
}

function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function colorGenerator() {
  const hue = Math.floor(Math.random() * 40) + 200
  const saturation = Math.floor(Math.random() * 30) + 60
  const lightness = Math.floor(Math.random() * 30) + 50
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

export { debounce, isError, camelToTitle, formatDate, colorGenerator }
