import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

export function withSSRGuest<p>(fn: GetServerSideProps<p>): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {
        const cookies = parseCookies(ctx)

        if (cookies['burnauth.token']) {
            return {
                redirect: {
                    destination: '/store/cliente/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(ctx)
    }
}