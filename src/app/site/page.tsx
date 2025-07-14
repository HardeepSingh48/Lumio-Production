import Image from "next/image";
import { Check } from "lucide-react";
import { pricingCards } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  })
  return (
    <>

      <section className="h-full w-full pt-24 md:pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute inset-0 
           bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] 
           bg-[size:4rem_4rem] 
           [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <p className="text-center mt-6 md:mt-10 text-base md:text-lg">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative mb-10 md:mb-14">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Plura
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center relative md:mt-[-70px] w-full px-4">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1000}
            width={1000}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
          <h2 className="text-4xl text-center mt-20"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6 w-full max-w-5xl">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={clsx(
                'w-full md:w-[300px] flex flex-col justify-between mb-4 md:mb-0',
                { "border-2 border-primary": card.title === "Unlimited Saas" },
              )}
            >
              <CardHeader>
                <CardTitle className={clsx('', { 'text-muted-foreground': card.title !== 'Unlimited Saas' })}>
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl md:text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="text-muted-foreground" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={clsx(
                    'w-full text-center bg-blue-700 text-primary-foreground p-2 rounded-md',
                    { 'bg-muted text-muted-foreground': card.title !== 'Unlimited Saas' }
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

    </>

  );
}
