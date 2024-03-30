import { Container } from '@/components/Container';

export default async function Home() {
    return (
        <>
            <Container className="mt-9">
                <div className="max-w-1xl">
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        by David Sampson with great tools
                    </p>
                </div>
            </Container>
        </>
    );
}
