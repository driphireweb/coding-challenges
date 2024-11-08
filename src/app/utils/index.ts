export const formatPhoneNumber = (phoneNumber: string | number): string => {
  const cleaned = String(phoneNumber).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }

  return String(phoneNumber)
}

export const specialtyColorMap: Record<string, {
  bg: string,
  text: string,
  border?: string
}> = {
  'Bipolar': { 
    bg: 'bg-purple-50', 
    text: 'text-purple-700',
    border: 'border border-purple-200'
  },
  'LGBTQ': { 
    bg: 'bg-pink-50', 
    text: 'text-pink-700',
    border: 'border border-pink-200'
  },
  'Medication/Prescribing': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700',
    border: 'border border-blue-200'
  },
  'Suicide History/Attempts': { 
    bg: 'bg-red-50', 
    text: 'text-red-700',
    border: 'border border-red-200'
  },
  'General Mental Health (anxiety, depression, stress, grief, life transitions)': { 
    bg: 'bg-green-50', 
    text: 'text-green-700',
    border: 'border border-green-200'
  },
  "Men's issues": { 
    bg: 'bg-slate-50', 
    text: 'text-slate-700',
    border: 'border border-slate-200'
  },
  'Relationship Issues (family, friends, couple, etc)': { 
    bg: 'bg-pink-50', 
    text: 'text-pink-700',
    border: 'border border-pink-200'
  },
  'Trauma & PTSD': { 
    bg: 'bg-orange-50', 
    text: 'text-orange-700',
    border: 'border border-orange-200'
  },
  'Personality disorders': { 
    bg: 'bg-violet-50', 
    text: 'text-violet-700',
    border: 'border border-violet-200'
  },
  'Personal growth': { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-700',
    border: 'border border-emerald-200'
  },
  'Substance use/abuse': { 
    bg: 'bg-amber-50', 
    text: 'text-amber-700',
    border: 'border border-amber-200'
  },
  'Pediatrics': { 
    bg: 'bg-sky-50', 
    text: 'text-sky-700',
    border: 'border border-sky-200'
  },
  "Women's issues (post-partum, infertility, family planning)": { 
    bg: 'bg-fuchsia-50', 
    text: 'text-fuchsia-700',
    border: 'border border-fuchsia-200'
  },
  'Chronic pain': { 
    bg: 'bg-red-50', 
    text: 'text-red-700',
    border: 'border border-red-200'
  },
  'Weight loss & nutrition': { 
    bg: 'bg-lime-50', 
    text: 'text-lime-700',
    border: 'border border-lime-200'
  },
  'Eating disorders': { 
    bg: 'bg-teal-50', 
    text: 'text-teal-700',
    border: 'border border-teal-200'
  },
  'Diabetic Diet and nutrition': { 
    bg: 'bg-cyan-50', 
    text: 'text-cyan-700',
    border: 'border border-cyan-200'
  },
  'Coaching (leadership, career, academic and wellness)': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700',
    border: 'border border-blue-200'
  },
  'Life coaching': { 
    bg: 'bg-indigo-50', 
    text: 'text-indigo-700',
    border: 'border border-indigo-200'
  },
  'Obsessive-compulsive disorders': { 
    bg: 'bg-purple-50', 
    text: 'text-purple-700',
    border: 'border border-purple-200'
  },
  'Neuropsychological evaluations & testing (ADHD testing)': { 
    bg: 'bg-slate-50', 
    text: 'text-slate-700',
    border: 'border border-slate-200'
  },
  'Attention and Hyperactivity (ADHD)': { 
    bg: 'bg-orange-50', 
    text: 'text-orange-700',
    border: 'border border-orange-200'
  },
  'Sleep issues': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700',
    border: 'border border-blue-200'
  },
  'Schizophrenia and psychotic disorders': { 
    bg: 'bg-red-50', 
    text: 'text-red-700',
    border: 'border border-red-200'
  },
  'Learning disorders': { 
    bg: 'bg-yellow-50', 
    text: 'text-yellow-700',
    border: 'border border-yellow-200'
  },
  'Domestic abuse': { 
    bg: 'bg-rose-50', 
    text: 'text-rose-700',
    border: 'border border-rose-200'
  },
  'default': { 
    bg: 'bg-gray-50', 
    text: 'text-gray-700',
    border: 'border border-gray-200'
  }
}