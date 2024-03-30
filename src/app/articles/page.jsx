import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export default async function ArticlesIndex() {
  return (
      <SimpleLayout
          // title="Writing on software development, agile, web design, latest tech and how best practices can be used for good."
          // intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
        </div>
      </div>
    </SimpleLayout>
  )
}
