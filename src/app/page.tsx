'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { Skeleton } from "~/components/ui/skeleton"
import { IconRefresh, IconSearch } from '@tabler/icons-react'
import { formatPhoneNumber, specialtyColorMap } from './utils'

// First, define an interface for your Advocate type
interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string | number;
  phoneNumber: string;
}


export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([])
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [hoveredMore, setHoveredMore] = useState<{
    visible: boolean;
    specialties: string[];
    x: number;
    y: number;
  } | null>(null);

  // Memoize the fetch function
  const fetchAdvocates = useCallback(async (search?: string) => {
    setIsLoading(true)
    try {
      const url = search 
        ? `/api/advocates?search=${encodeURIComponent(search)}`
        : '/api/advocates'
      
      const response = await fetch(url)
      const { data } = await response.json()
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (!search) {
        setAdvocates(data)
        setFilteredAdvocates(data)
      } else {
        setFilteredAdvocates(data)
      }
    } catch (error) {
      console.error('Error fetching advocates:', error)
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    fetchAdvocates()
  }, [fetchAdvocates])

  // Memoize the reset function
  const handleReset = useCallback(() => {
    setSearchTerm('')
    setFilteredAdvocates(advocates)
  }, [advocates])

  // Add this memoized component for no results
  const NoResults = useMemo(() => (
    <TableRow>
      <TableCell colSpan={7} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <IconSearch className="h-8 w-8 mb-2 opacity-50" />
          <p className="text-sm">No advocates found matching "{searchTerm}"</p>
          <Button 
            variant="link" 
            className="mt-2"
            onClick={handleReset}
          >
            Reset search
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ), [searchTerm, handleReset])

  // Update the debounced onChange handler to prevent flickering
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (!value.trim()) {
      setFilteredAdvocates(advocates)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      fetchAdvocates(value)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [fetchAdvocates, advocates])

  // Memoize the loading state UI
  const LoadingSkeleton = useMemo(() => (
    Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
        <TableCell>
          <div className="flex gap-1">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
      </TableRow>
    ))
  ), [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-white space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-center drop-shadow-lg">
            Find Your Perfect Advocate
          </h1>
          <p className="text-xl text-center max-w-2xl drop-shadow">
            Connect with mental health professionals who understand your unique journey
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto -mt-8 px-4">
        <div className="bg-white rounded-lg shadow-xl p-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="search" 
                className="flex-1 text-lg h-12 pl-10 pr-4"
                placeholder="Search advocates..." 
                value={searchTerm}
                onChange={onChange}
              />
            </div>
            <Button 
              variant="outline" 
              className="h-12 px-6"
              onClick={handleReset}
            >
              <IconRefresh className="h-4 w-4" />
              Reset Search
            </Button>
          </div>
          
          {searchTerm && (
            <p className="text-sm text-muted-foreground mt-2">
              Searching for: <span className="font-medium">{searchTerm}</span>
            </p>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="container mx-auto py-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">First Name</TableHead>
              <TableHead className="w-[120px]">Last Name</TableHead>
              <TableHead className="w-[100px]">City</TableHead>
              <TableHead className="w-[80px]">Degree</TableHead>
              <TableHead className="w-[200px]">Specialties</TableHead>
              <TableHead className="w-[80px]">Years of Experience</TableHead>
              <TableHead className="w-[120px]">Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              LoadingSkeleton
            ) : filteredAdvocates.length === 0 ? (
              NoResults
            ) : (
              filteredAdvocates.map((advocate, index) => (
                <TableRow key={index}>
                  <TableCell>{advocate.firstName}</TableCell>
                  <TableCell>{advocate.lastName}</TableCell>
                  <TableCell>{advocate.city}</TableCell>
                  <TableCell>{advocate.degree}</TableCell>
                  <TableCell className="w-[200px]">
                    <div className="flex flex-wrap gap-1 overflow-hidden">
                      {advocate.specialties.slice(0, 5).map((specialty, idx) => {
                        const colors = specialtyColorMap[specialty] || specialtyColorMap.default
                        return (
                          <Badge 
                            key={idx} 
                            variant="secondary"
                            className={`
                              ${colors.bg} 
                              ${colors.text} 
                              ${colors.border || ''} 
                              font-medium 
                              text-xs
                            `}
                          >
                            {specialty}
                          </Badge>
                        )
                      })}
                      {advocate.specialties.length > 5 && (
                        <div className="relative inline-block">
                          <Badge 
                            variant="secondary"
                            className="bg-gray-50 text-gray-700 border border-gray-200 font-medium text-xs cursor-help hover:bg-gray-100"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredMore({
                                visible: true,
                                specialties: advocate.specialties,
                                x: rect.left,
                                y: rect.top - 10 // Offset slightly above the badge
                              });
                            }}
                            onMouseLeave={() => setHoveredMore(null)}
                          >
                            +{advocate.specialties.length - 5} more
                          </Badge>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{advocate.yearsOfExperience}</TableCell>
                  <TableCell>{formatPhoneNumber(advocate.phoneNumber)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {hoveredMore && (
        <div 
          className="fixed z-50 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
          style={{
            left: `${hoveredMore.x}px`,
            top: `${hoveredMore.y - 8}px`,
            transform: 'translateY(-100%)',
          }}
          onMouseEnter={() => setHoveredMore(hoveredMore)}
          onMouseLeave={() => setHoveredMore(null)}
        >
          <p className="font-medium text-sm mb-2">All Specialties:</p>
          <div className="flex flex-wrap gap-1 max-w-[300px]">
            {hoveredMore.specialties.map((specialty, idx) => {
              const colors = specialtyColorMap[specialty] || specialtyColorMap.default;
              return (
                <Badge 
                  key={idx} 
                  variant="secondary"
                  className={`
                    ${colors.bg} 
                    ${colors.text} 
                    ${colors.border || ''} 
                    font-medium 
                    text-xs
                  `}
                >
                  {specialty}
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </main>
  )
}
