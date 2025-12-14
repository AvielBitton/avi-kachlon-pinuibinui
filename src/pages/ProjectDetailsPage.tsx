import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Project } from '../types/project'
import projectsData from '../data/projects.json'

const projects = projectsData as Project[]
const FALLBACK_IMAGE = '/avi-kachlon-pinuibinui/placeholder-building.svg'

export default function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-100 mb-4">הפרויקט לא נמצא</h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300"
          >
            <ArrowRightIcon className="w-4 h-4" />
            חזרה לפרויקטים
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-surface-400">
            <li>
              <Link to="/" className="hover:text-primary-400 transition-colors">
                ראשי
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/projects" className="hover:text-primary-400 transition-colors">
                פרויקטים
              </Link>
            </li>
            <li>/</li>
            <li className="text-surface-200">{project.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-400 text-sm font-medium rounded-full">
              {project.category}
            </span>
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-2">
            {project.name}
          </h1>
          {project.city && (
            <p className="text-lg text-surface-400 flex items-center gap-2">
              <LocationIcon className="w-5 h-5" />
              {project.address || project.city}
            </p>
          )}
        </div>

        {/* Gallery */}
        <ImageGallery 
          images={project.images.length > 0 ? project.images : [FALLBACK_IMAGE]} 
          projectName={project.name} 
        />

        {/* Key facts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {project.apartments_before !== null && (
            <div className="p-4 bg-surface-900 rounded-xl border border-surface-800">
              <div className="text-sm text-surface-400 mb-1">דירות קיימות</div>
              <div className="text-2xl font-bold text-surface-100">{project.apartments_before}</div>
            </div>
          )}
          {project.apartments_after !== null && (
            <div className="p-4 bg-surface-900 rounded-xl border border-surface-800">
              <div className="text-sm text-surface-400 mb-1">דירות מתוכננות</div>
              <div className="text-2xl font-bold text-primary-400">{project.apartments_after}</div>
            </div>
          )}
          <div className="p-4 bg-surface-900 rounded-xl border border-surface-800">
            <div className="text-sm text-surface-400 mb-1">סוג הפרויקט</div>
            <div className="text-lg font-medium text-surface-100">{project.category}</div>
          </div>
          <div className="p-4 bg-surface-900 rounded-xl border border-surface-800">
            <div className="text-sm text-surface-400 mb-1">סטטוס</div>
            <div className="text-lg font-medium text-surface-100">{project.status}</div>
          </div>
        </div>

        {/* Description */}
        {project.short_description && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-surface-100 mb-4">על הפרויקט</h2>
            <p className="text-surface-300 leading-relaxed">{project.short_description}</p>
          </div>
        )}

        {/* External link */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={project.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors"
          >
            <ExternalLinkIcon className="w-5 h-5" />
            צפייה באתר קבוצת בראשית
          </a>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-800 hover:bg-surface-700 text-surface-100 rounded-xl font-medium transition-colors border border-surface-700"
          >
            <ArrowRightIcon className="w-5 h-5" />
            חזרה לפרויקטים
          </Link>
        </div>
      </div>
    </div>
  )
}

function ImageGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (images.length === 0) return null

  return (
    <div className="mb-10">
      {/* Main image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-900 mb-4">
        <img
          src={images[currentIndex]}
          alt={`${projectName} - תמונה ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            if (target.src !== FALLBACK_IMAGE) {
              target.src = FALLBACK_IMAGE
            }
          }}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-950/70 hover:bg-surface-950/90 text-surface-100 flex items-center justify-center transition-colors"
              aria-label="תמונה קודמת"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-950/70 hover:bg-surface-950/90 text-surface-100 flex items-center justify-center transition-colors"
              aria-label="תמונה הבאה"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-950/70 rounded-full text-sm text-surface-200">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentIndex
                  ? 'border-primary-500'
                  : 'border-transparent hover:border-surface-600'
              }`}
            >
              <img
                src={image}
                alt={`תמונה ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE
                  }
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
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
function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}


