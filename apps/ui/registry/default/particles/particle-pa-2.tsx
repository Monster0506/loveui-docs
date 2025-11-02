"use client"

import * as React from "react"

import { Button } from "@/registry/default/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/default/ui/pagination"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"

type PaginationProps = {
  currentPage?: number
  totalPages?: number
  totalResults: number
  resultsPerPage?: number
}

export default function Particle({
  currentPage: initialPage = 1,
  totalPages = 10,
  totalResults,
  resultsPerPage = 10,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(initialPage)
  const resultRanges = Array.from({ length: totalPages }, (_, i) => {
    const start = i * resultsPerPage + 1
    const end = Math.min((i + 1) * resultsPerPage, totalResults)
    const pageNum = i + 1
    return { label: `${start}-${end}`, value: pageNum }
  })

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Results range selector */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <p className="text-sm text-muted-foreground">Viewing</p>
        <Select
          value={currentPage}
          onValueChange={(value) => setCurrentPage(value as number)}
          items={resultRanges}
        >
          <SelectTrigger
            className="min-w-none w-fit"
            size="sm"
            aria-label="Select result range"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {resultRanges.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <p className="text-sm text-muted-foreground">
          of{" "}
          <strong className="font-medium text-foreground">
            {totalResults}
          </strong>{" "}
          results
        </p>
      </div>

      {/* Pagination */}
      <div>
        <Pagination>
          <PaginationContent className="w-full justify-between gap-2">
            <PaginationItem>
              <PaginationPrevious
                className="sm:*:[svg]:hidden"
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1 ? true : undefined}
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                  />
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className="sm:*:[svg]:hidden"
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages ? true : undefined}
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                  />
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
