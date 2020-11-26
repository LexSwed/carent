export declare type PaginationArgs = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
}

export function relayToPrismaPagination(
  args: PaginationArgs
): { cursor?: { id: string }; take?: number; skip?: number } {
  const { first, last, before, after } = args

  const take = resolveTake(first, last)
  const cursor = resolveCursor(before, after)
  const skip = resolveSkip(cursor)

  const newArgs = {
    take,
    cursor,
    skip,
  }

  return newArgs
}

function resolveTake(first: number | null | undefined, last: number | null | undefined): number | undefined {
  if (first) {
    if (first < 0) {
      throw new Error(`first can't be negative`)
    }
    return first
  }

  if (last) {
    if (last < 0) {
      throw new Error(`last can't be negative`)
    }

    if (last === 0) {
      return 0
    }

    return last * -1
  }

  return undefined
}

function resolveCursor(before: string | null | undefined, after: string | null | undefined) {
  if (before) {
    return { id: before }
  }

  if (after) {
    return { id: after }
  }

  return undefined
}

function resolveSkip(cursor: { id: string } | null | undefined) {
  if (cursor) {
    return 1
  }

  return undefined
}
