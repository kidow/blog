import React, { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { XIcon } from '@heroicons/react/solid'
import classnames from 'classnames'
import { createPortal } from 'react-dom'

interface Props {
  onClose?: () => void
  title?: string
  description?: string
  padding?: boolean
  footer?: ReactNode
  maxWidth?:
    | 'max-w-screen-2xl'
    | 'max-w-screen-xl'
    | 'max-w-screen-lg'
    | 'max-w-screen-md'
    | 'max-w-screen-sm'
    | 'max-w-full'
    | 'max-w-8xl'
    | 'max-w-7xl'
    | 'max-w-6xl'
    | 'max-w-5xl'
    | 'max-w-4xl'
    | 'max-w-3xl'
    | 'max-w-2xl'
    | 'max-w-xl'
    | 'max-w-lg'
    | 'max-w-md'
    | 'max-w-sm'
    | 'max-w-xs'
  children: ReactNode
}

const Dialog = forwardRef<HTMLDialogElement, Props>(
  (
    {
      onClose,
      title,
      description,
      padding = true,
      footer,
      maxWidth = 'max-w-lg',
      ...props
    },
    ref
  ) => {
    return createPortal(
      <dialog
        ref={ref}
        className={classnames(
          'w-full rounded-lg p-0 backdrop:bg-black backdrop:opacity-30',
          maxWidth
        )}
        onClick={(e) => {
          // @ts-ignore
          if (e.target === ref.current) {
            if (onClose) onClose()
            // @ts-ignore
            else ref.current?.close()
          }
        }}
        {...props}
      >
        <header className="border-t-4 border-gray-800">
          {!!title && (
            <div
              className={classnames(
                'flex border-b border-neutral-200 p-4',
                !!description ? 'items-start' : 'items-center'
              )}
            >
              <div className="flex-1">
                <h1 className="text-lg font-semibold">{title}</h1>
                {!!description && (
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
              </div>
              <button
                // @ts-ignore
                onClick={() => ref.current?.close()}
                className="rounded-full p-2 hover:bg-gray-300"
              >
                <XIcon className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          )}
        </header>
        <div className={classnames({ 'py-6 px-7': padding })}>
          {props.children}
        </div>
      </dialog>,
      document.body
    )
  }
)

export default Dialog
