import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Project, ProjectCategory } from '../types/project'
import projectsData from '../data/projects.json'

const projects = projectsData as Project[]

const categories: ProjectCategory[] = [
  'פינוי בינוי',
  'הריסה ובנייה (38/2)',
  'חיזוק ותוספת (38/1)',
  'אחר',
]

type SortOption = 'name' | 'city'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('name')

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.city && p.city.toLowerCase().includes(query)) ||
          (p.address && p.address.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Sort (keep "הרצל סוקולוב" always last)
    result.sort((a, b) => {
      // Keep manual project at the end
      const isManualA = a.id === 'proj-manual-1'
      const isManualB = b.id === 'proj-manual-1'
      if (isManualA && !isManualB) return 1
      if (!isManualA && isManualB) return -1

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'he')
      } else if (sortBy === 'city') {
        const cityA = a.city || 'תתתת' // Sort nulls last
        const cityB = b.city || 'תתתת'
        return cityA.localeCompare(cityB, 'he')
      }
      return 0
    })

    return result
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-4">
            פרויקטים
          </h1>
          <p className="text-surface-300 text-lg max-w-2xl mx-auto">
            פרויקטי התחדשות עירונית בליווי המשרד
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש לפי שם או עיר..."
              className="w-full pr-12 pl-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
          </div>

          {/* Category chips & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                }`}
              >
                הכל
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-surface-400">
                מיון:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg text-surface-200 text-sm focus:outline-none focus:border-primary-500"
              >
                <option value="name">לפי שם</option>
                <option value="city">לפי עיר</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-surface-400 text-sm">
          {filteredProjects.length} פרויקטים נמצאו
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-800 flex items-center justify-center">
              <SearchIcon className="w-8 h-8 text-surface-500" />
            </div>
            <h3 className="text-lg font-medium text-surface-300 mb-2">לא נמצאו פרויקטים</h3>
            <p className="text-surface-500">נסו לשנות את החיפוש או הסינון</p>
          </div>
        )}
      </div>
    </div>
  )
}

const FALLBACK_IMAGE = '/avi-kachlon-pinuibinui/placeholder-building.svg'

function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.images.length > 0 ? project.images[0] : FALLBACK_IMAGE

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block bg-surface-900 rounded-2xl overflow-hidden border border-surface-800 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 transition-all"
    >
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            if (target.src !== FALLBACK_IMAGE) {
              target.src = FALLBACK_IMAGE
            }
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 bg-surface-950/80 backdrop-blur-sm text-primary-400 text-xs font-medium rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-surface-100 mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">
          {project.name}
        </h3>
        {project.city && (
          <p className="text-sm text-surface-400 mb-3 flex items-center gap-1">
            <LocationIcon className="w-4 h-4" />
            {project.city}
          </p>
        )}

        {/* Stats */}
        {(project.apartments_before !== null || project.apartments_after !== null) && (
          <div className="flex items-center gap-4 text-sm">
            {project.apartments_before !== null && (
              <div className="text-surface-400">
                <span className="text-surface-500">לפני: </span>
                <span className="text-surface-200 font-medium">{project.apartments_before}</span>
              </div>
            )}
            {project.apartments_after !== null && (
              <div className="text-surface-400">
                <span className="text-surface-500">אחרי: </span>
                <span className="text-primary-400 font-medium">{project.apartments_after}</span>
              </div>
            )}
          </div>
        )}

        {/* Status badge */}
        <div className="mt-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>
    </Link>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'הושלם':
      return 'bg-green-500/20 text-green-400'
    case 'בביצוע':
      return 'bg-blue-500/20 text-blue-400'
    case 'בתכנון':
      return 'bg-yellow-500/20 text-yellow-400'
    default:
      return 'bg-surface-700 text-surface-300'
  }
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}


