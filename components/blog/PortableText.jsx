'use client'

import { urlFor } from '@/lib/sanity'
import { Fragment } from 'react'

// Helper component for rendering text with marks
function TextWithMarks({ child, block }) {
  let text = child.text || ''
  
  // Skip empty children
  if (!text && !child.marks) return null
  
  if (!child.marks || child.marks.length === 0) {
    return text
  }
  
  // Apply marks - process in reverse order for correct nesting
  let element = text
  const marks = [...child.marks].reverse()
  
  marks.forEach(mark => {
    if (typeof mark === 'string') {
      if (mark === 'strong') {
        element = <strong>{element}</strong>
      } else if (mark === 'em') {
        element = <em>{element}</em>
      } else if (mark === 'code') {
        element = <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">{element}</code>
      } else if (mark === 'underline') {
        element = <u>{element}</u>
      } else if (mark === 'strike-through') {
        element = <s>{element}</s>
      }
    } else {
      // Handle annotations (links) - mark is an object with _key
      const def = block.markDefs?.find(d => d._key === mark)
      if (def?._type === 'link') {
        element = (
          <a 
            href={def.href || ''} 
            target={def.blank ? '_blank' : '_self'} 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {element}
          </a>
        )
      }
    }
  })
  
  return element
}

// Process block children
function BlockContent({ block }) {
  if (!block.children || block.children.length === 0) return null
  
  return block.children
    .map((child, childIndex) => {
      const content = <TextWithMarks key={childIndex} child={child} block={block} />
      return content
    })
    .filter(Boolean)
}

export default function PortableText({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null

  // Group blocks for list handling
  const groupedBlocks = []
  let currentList = null

  blocks.forEach((block, index) => {
    if (block._type === 'block' && block.listItem) {
      const listType = block.listItem === 'number' ? 'ol' : 'ul'
      const level = block.level || 1
      
      if (!currentList || currentList.type !== listType) {
        // Start new list
        if (currentList) {
          groupedBlocks.push(currentList)
        }
        currentList = {
          type: listType,
          items: [{ block, level }]
        }
      } else {
        // Add to current list
        currentList.items.push({ block, level })
      }
    } else {
      // Non-list block
      if (currentList) {
        groupedBlocks.push(currentList)
        currentList = null
      }
      groupedBlocks.push({ type: 'block', block, originalIndex: index })
    }
  })
  
  // Don't forget the last list
  if (currentList) {
    groupedBlocks.push(currentList)
  }

  return (
    <div className="prose prose-invert max-w-none break-words">
      {groupedBlocks.map((group, groupIndex) => {
        // Render list
        if (group.type === 'ol' || group.type === 'ul') {
          const ListTag = group.type
          const listClass = group.type === 'ol' 
            ? 'list-decimal pl-6 my-3 space-y-1' 
            : 'list-disc pl-6 my-3 space-y-1'
          
          return (
            <ListTag key={groupIndex} className={listClass}>
              {group.items
                .map((item, itemIndex) => {
                  const itemContent = <BlockContent block={item.block} />
                  if (!itemContent || (Array.isArray(itemContent) && itemContent.length === 0)) return null
                  return (
                    <li key={itemIndex} className="text-gray-200 leading-relaxed mb-1">
                      {itemContent}
                    </li>
                  )
                })
                .filter(Boolean)}
            </ListTag>
          )
        }
        
        // Render regular block
        const { block, originalIndex } = group
        
        if (block._type === 'block') {
          const style = block.style || 'normal'
          
          switch(style) {
            case 'h1': 
              return (
                <h1 key={groupIndex} className="text-4xl font-bold mb-4 mt-8 gradient-text">
                  <BlockContent block={block} />
                </h1>
              )
            case 'h2': 
              return (
                <h2 key={groupIndex} className="text-3xl font-bold mb-3 mt-6 text-white">
                  <BlockContent block={block} />
                </h2>
              )
            case 'h3': 
              return (
                <h3 key={groupIndex} className="text-2xl font-semibold mb-2 mt-5 text-white">
                  <BlockContent block={block} />
                </h3>
              )
            case 'h4': 
              return (
                <h4 key={groupIndex} className="text-xl font-semibold mb-2 mt-4 text-white">
                  <BlockContent block={block} />
                </h4>
              )
            case 'blockquote': 
              return (
                <blockquote key={groupIndex} className="border-l-4 border-primary pl-6 py-3 my-6 bg-white/5 rounded-r-lg italic text-gray-300">
                  <BlockContent block={block} />
                </blockquote>
              )
            case 'normal': 
              const hasContent = block.children?.some(child => child.text?.trim())
              if (!hasContent) return null
              const normalContent = <BlockContent block={block} />
              if (!normalContent || (Array.isArray(normalContent) && normalContent.length === 0)) return null
              return (
                <p key={groupIndex} className="mb-3 leading-relaxed text-gray-200">
                  {normalContent}
                </p>
              )
            default: 
              const defaultContent = <BlockContent block={block} />
              if (!defaultContent || (Array.isArray(defaultContent) && defaultContent.length === 0)) return null
              return (
                <p key={groupIndex} className="mb-3 leading-relaxed text-gray-200">
                  {defaultContent}
                </p>
              )
          }
        } 
        else if (block._type === 'image') {
          const imageUrl = urlFor(block)?.url()
          const alt = block.alt || 'Article Image'
          const caption = block.caption || ''
          
          if (!imageUrl) return null
          
          return (
            <figure key={groupIndex} className="my-6">
              <img 
                src={imageUrl} 
                alt={alt} 
                className="rounded-[20px] w-full shadow-2xl"
                loading="lazy"
              />
              {caption && (
                <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
                  {caption}
                </figcaption>
              )}
            </figure>
          )
        }
        else if (block._type === 'code') {
          const code = block.code || ''
          const language = block.language || 'text'
          
          return (
            <div key={groupIndex} className="my-8 relative">
              <div className="absolute top-0 left-0 px-3 py-1 bg-gray-700 text-xs text-gray-300 rounded-tl-lg rounded-br-lg">
                {language}
              </div>
              <pre className="bg-gray-900 rounded-lg p-6 pt-10 overflow-x-auto border border-white/10">
                <code className="text-sm text-gray-200">{code}</code>
              </pre>
            </div>
          )
        }
        
        return null
      })}
    </div>
  )
}
