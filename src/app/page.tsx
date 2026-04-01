import { HeroSection } from "@/components/hero/hero-section";
import { SocialProofBar } from "@/components/social-proof/social-proof-bar";
import { Testimonial } from "@/components/testimonials/testimonial";
import { FeatureShowcase } from "@/components/features/feature-showcase";
import { GroupsSection } from "@/components/groups/groups-section";
import { DeveloperSection } from "@/components/developer/developer-section";
import { UseCasesGrid } from "@/components/use-cases/use-cases-grid";
import { FaqSection } from "@/components/faq/faq-section";
import { FinalCta } from "@/components/cta/final-cta";
import { GridSection, GridEnd } from "@/components/layout/grid-lines";

export default function Home() {
  return (
    <main className="relative">
      {/* Radial gradient accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-green/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-green/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-green/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-green/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-20">
        {/* Hero — sits above the grid, no borders */}
        <HeroSection />

        {/* Grid-framed sections start here */}
        <GridSection noBorderTop>
          <SocialProofBar />
        </GridSection>

        <GridSection>
          <Testimonial
            quote={"\u201CHappenstance is by far the best social network search I have ever seen.\u201D"}
            name="Garry Tan"
            title="Y Combinator"
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Garry_Tan%2C_Web_Summit_2018%2C_November_6_SD5_6949_%2845700698642%29%28portrait_4x3_crop%29.jpg/500px-Garry_Tan%2C_Web_Summit_2018%2C_November_6_SD5_6949_%2845700698642%29%28portrait_4x3_crop%29.jpg"
          />
        </GridSection>

        <GridSection>
          <FeatureShowcase />
        </GridSection>

        <GridSection>
          <Testimonial
            quote={"\u201CIt would be amazing if every community had a Happenstance by default.\u201D"}
            name="Sahin Boydas"
            title="2x Exited Founder (Snap, Gusto)"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1cD3vp6GLDty3HIrz6K_RmnsJimHFNBoi9H-7ky2-Qyj0KdcCMX8TWh4rNNPWy4QI37I3aywwsaxY6gqhZj5F2s35BlDPZ914fq1jw&s=10"
          />
        </GridSection>

        <GridSection>
          <GroupsSection />
        </GridSection>

        <GridSection>
          <Testimonial
            quote={"\u201CI ran a quick search on Happenstance for a hard-to-fill role and a strong candidate surfaced in the top results...three weeks later he had an offer.\u201D"}
            name="Jonathan Chizick"
            title="Capital Factory"
            image="https://evalyze-public-prod.s3.us-east-1.amazonaws.com/investor-images/cm81dtl110007ho8b5g15lcdr-7632bbff-6c76-4de2-980e-d4643f253eaa.jpg"
          />
        </GridSection>

        <GridSection>
          <DeveloperSection />
        </GridSection>

        <GridSection>
          <Testimonial
            quote={"\u201CIt\u2019s better than the Swiss Army knife of OSINT tools we rely on.\u201D"}
            name="Marc Hamel"
            title="Waymo"
            image="https://media.licdn.com/dms/image/v2/D5603AQErZ0EmBAH6mg/profile-displayphoto-crop_800_800/B56Z1Dp5WuGwAI-/0/1774956550870?e=1776902400&v=beta&t=TzoK70TCuCFTyaFb_mfA3qVzyScfORtQ2OOH265qLuc"
          />
        </GridSection>

        <GridSection>
          <UseCasesGrid />
        </GridSection>

        <GridSection>
          <FaqSection />
        </GridSection>

        <GridSection>
          <Testimonial
            quote={"\u201CIn the pendulum swing back to quality over quantity, Happenstance is an absolute weapon.\u201D"}
            name="Chris Madden"
            title="Stump"
          />
        </GridSection>

        <GridSection>
          <FinalCta />
        </GridSection>

        <GridEnd />
      </div>
    </main>
  );
}
