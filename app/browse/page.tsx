"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Filter, Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dogs } from "@/data/dogs"

export default function BrowsePage() {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
  const [selectedAges, setSelectedAges] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([1000, 5000])
  const [displayPriceRange, setDisplayPriceRange] = useState([1000, 5000])
  const priceRangeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [breedOptions, setBreedOptions] = useState<string[]>([])
  const [openBreedDropdown, setOpenBreedDropdown] = useState(false)
  const [showMobileBreedSelector, setShowMobileBreedSelector] = useState(false)
  const [breedSearchQuery, setBreedSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keep focus on search input when typing
  useEffect(() => {
    if (showMobileBreedSelector && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [breedSearchQuery, showMobileBreedSelector])

  // Extract unique breeds from the data and handle errors
  useEffect(() => {
    try {
      const uniqueBreeds = Array.from(new Set(dogs.map(dog => dog.breed)))
      setBreedOptions(uniqueBreeds)
    } catch (error) {
      console.error("Error setting breed options:", error)
      setBreedOptions([])
    }
  }, [])
  
  // Close mobile breed selector when clicking outside
  useEffect(() => {
    if (!showMobileBreedSelector) return
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-breed-selector-container')) {
        setShowMobileBreedSelector(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMobileBreedSelector])
  const ageGroups = [
    { label: "หมาเด็ก (0-2)", value: "0-2" },
    { label: "หมาโตเต็มไว (2-9)", value: "2-9" },
    { label: "หมาสูงวัย (9-11+)", value: "9+" },
  ]

  const handleBreedChange = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds(selectedBreeds.filter((b) => b !== breed))
    } else {
      setSelectedBreeds([...selectedBreeds, breed])
    }
  }

  const handleAgeChange = (age: string, checked: boolean) => {
    if (checked) {
      setSelectedAges([...selectedAges, age])
    } else {
      setSelectedAges(selectedAges.filter((a) => a !== age))
    }
  }

  // Helper function to check if dog age matches selected age groups
  const checkAgeMatch = (dogAge: string, selectedAges: string[]) => {
    if (selectedAges.length === 0) return true;
    
    // Extract numeric values from dog age (e.g., "1-2 ปี" -> [1, 2])
    const ageRange = dogAge.split(" ")[0].split("-").map(Number);
    const minAge = ageRange[0];
    const maxAge = ageRange.length > 1 ? ageRange[1] : minAge;
    
    return selectedAges.some(selectedAge => {
      if (selectedAge === "0-2") return minAge >= 0 && maxAge <= 2;
      if (selectedAge === "2-9") return (minAge >= 2 && minAge <= 9) || (maxAge >= 2 && maxAge <= 9);
      if (selectedAge === "9+") return minAge >= 9 || maxAge >= 9;
      return false;
    });
  };

  const filteredDogs = dogs.filter((dog) => {
    const breedMatch = selectedBreeds.length === 0 || selectedBreeds.includes(dog.breed);
    const priceMatch = dog.pricePerDay >= priceRange[0] && dog.pricePerDay <= priceRange[1];
    const ageMatch = checkAgeMatch(dog.age, selectedAges);
    const searchMatch = searchQuery === "" || 
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dog.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return breedMatch && priceMatch && ageMatch && searchMatch;
  })

  const FilterSidebar = ({ isMobile = false }) => (
    <div className="w-full lg:w-80 bg-white p-6 border-r border-gray-200">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับหน้าหลัก
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">หาหมาที่อยากเช่า</h1>
      </div>

      {/* Breed Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">พันธุ์หมา</h3>
        {isMobile ? (
          <div className="mobile-breed-selector-container relative">
            <Button
              variant="outline"
              className="w-full justify-between touch-manipulation mb-2"
              onClick={(e) => {
                e.stopPropagation() // Prevent event bubbling
                // Toggle a local state for mobile breed selector
                setShowMobileBreedSelector(!showMobileBreedSelector)
              }}
            >
              {selectedBreeds.length > 0 
                ? `${selectedBreeds.length} พันธุ์ที่เลือก` 
                : "เลือกพันธุ์หมา"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            
            {/* Mobile Breed Selector */}
            {showMobileBreedSelector && (
              <div className="border rounded-lg shadow-md bg-white mb-4 max-h-[40vh] overflow-auto z-30 absolute w-full">
                <div className="p-2 border-b sticky top-0 bg-white z-10">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="ค้นหาพันธุ์หมา..."
                    className="w-full p-2 border rounded-md"
                    value={breedSearchQuery}
                    onChange={(e) => setBreedSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the input
                    onFocus={(e) => e.target.focus()}
                  />
                </div>
                <div onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
                  {breedOptions
                    .filter(breed => breed.toLowerCase().includes(breedSearchQuery.toLowerCase()))
                    .map((breed) => (
                      <div 
                        key={breed} 
                        className="p-3 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault()
                          handleBreedChange(breed)
                        }}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "w-5 h-5 border rounded-sm mr-2 flex items-center justify-center",
                            selectedBreeds.includes(breed) ? "bg-black text-white" : "bg-white"
                          )}>
                            {selectedBreeds.includes(breed) && <Check className="h-4 w-4" />}
                          </div>
                          <span>{breed}</span>
                        </div>
                      </div>
                    ))}
                  {breedOptions.filter(breed => breed.toLowerCase().includes(breedSearchQuery.toLowerCase())).length === 0 && (
                    <div className="p-3 text-center text-gray-500">
                      ไม่พบพันธุ์หมาที่ค้นหา
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Popover open={openBreedDropdown} onOpenChange={setOpenBreedDropdown}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openBreedDropdown}
                className="w-full justify-between"
              >
                {selectedBreeds.length > 0 
                  ? `${selectedBreeds.length} พันธุ์ที่เลือก` 
                  : "เลือกพันธุ์หมา"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" sideOffset={5} align="start">
              <Command>
                <CommandInput placeholder="ค้นหาพันธุ์หมา..." />
                <CommandEmpty>ไม่พบพันธุ์หมาที่ค้นหา</CommandEmpty>
                <CommandGroup>
                  {breedOptions.map((breed) => (
                    <CommandItem
                      key={breed}
                      value={breed}
                      onSelect={() => handleBreedChange(breed)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedBreeds.includes(breed) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {breed}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        {selectedBreeds.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedBreeds.map(breed => (
              <div key={breed} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                <span>{breed}</span>
                <button 
                  onClick={() => handleBreedChange(breed)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Age Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">อายุ</h3>
        <div className="space-y-3">
          {ageGroups.map((ageGroup) => (
            <div key={ageGroup.value} className="flex items-center space-x-2">
              <Checkbox
                id={ageGroup.value}
                checked={selectedAges.includes(ageGroup.value)}
                onCheckedChange={(checked) => handleAgeChange(ageGroup.value, checked as boolean)}
              />
              <Label htmlFor={ageGroup.value} className="text-gray-700 cursor-pointer">
                {ageGroup.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ราคา/วัน</h3>
        <div className="px-2">
          <div className="mb-6 pt-4">
            <Slider 
              value={displayPriceRange} 
              onValueChange={(newValues) => {
                // Ensure the minimum value is not greater than the maximum value
                if (newValues[0] <= newValues[1]) {
                  setDisplayPriceRange(newValues);
                  
                  // Clear any existing timeout
                  if (priceRangeTimeoutRef.current) {
                    clearTimeout(priceRangeTimeoutRef.current);
                  }
                  
                  // Set a new timeout to update the actual price range
                  priceRangeTimeoutRef.current = setTimeout(() => {
                    setPriceRange(newValues);
                  }, 500); // Only update the actual filter after 500ms of no sliding
                }
              }} 
              max={5000} 
              min={1000} 
              step={100} 
              className="mb-4" 
            />
            <div className="flex justify-between items-center mt-2">
              <div className="bg-gray-100 rounded-md px-3 py-1.5">
                <span className="text-sm font-medium">฿{displayPriceRange[0].toLocaleString()}</span>
              </div>
              <div className="h-[1px] flex-1 bg-gray-200 mx-2"></div>
              <div className="bg-gray-100 rounded-md px-3 py-1.5">
                <span className="text-sm font-medium">฿{displayPriceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          setSelectedBreeds([])
          setSelectedAges([])
          setPriceRange([1000, 5000])
          setDisplayPriceRange([1000, 5000])
          setSearchQuery("")
        }}
        variant="outline"
        className="w-full"
      >
        ล้างตัวกรอง
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 lg:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black">
            Logo
          </Link>
          <Button variant="outline" size="sm" onClick={() => setShowMobileFilters(!showMobileFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            ตัวกรอง
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar isMobile={false} />
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-white overflow-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">ตัวกรอง</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                  ปิด
                </Button>
              </div>
            </div>
            <div className="overflow-y-auto">
              <FilterSidebar isMobile={true} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหาหมาตามชื่อหรือคำอธิบาย..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ผลการค้นหา</h2>
            <p className="text-gray-600">พบ {filteredDogs.length} ตัวเลือก</p>
          </div>

          {/* Dog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDogs.map((dog) => (
              <Link href={`/pet/${dog.id}`} key={dog.id} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gray-200 relative">
                    <Image src={dog.image || "/placeholder.svg"} alt={dog.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{dog.name}</h3>
                      <p className="text-sm text-gray-600">{dog.age}</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{dog.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">{dog.pricePerDay.toLocaleString()}</span>
                        <span className="text-sm text-gray-600 ml-1">บาท/วัน</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent the card's link from activating
                          window.location.href = `/pet/${dog.id}`;
                        }}
                      >
                        เช่า
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredDogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">ไม่พบหมาที่ตรงกับเงื่อนไขที่เลือก</p>
              <Button
                onClick={() => {
                  setSelectedBreeds([])
                  setSelectedAges([])
                  setPriceRange([1000, 5000])
                  setDisplayPriceRange([1000, 5000])
                  setSearchQuery("")
                }}
                variant="outline"
                className="mt-4"
              >
                ล้างตัวกรองทั้งหมด
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
