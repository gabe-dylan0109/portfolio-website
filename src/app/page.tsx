import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";

export default function DesignSystemPreview() {
  return (
    <>
      <section className="bg-section-light py-16 md:py-24">
        <Container>
          <p className="type-eyebrow mb-4">Design system preview</p>
          <h1 className="type-display max-w-4xl">Typography and shell foundations</h1>
          <p className="type-body-lg mt-6 text-muted">
            Temporary visual test for tokens, type scale, mixed sections, and
            reusable components. This is not the production homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>Label</Tag>
            <Tag>Metadata</Tag>
            <Tag>Status</Tag>
          </div>
        </Container>
      </section>

      <section className="theme-dark bg-background py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Dark section"
            title="Navy surfaces stay editorial"
            description="Accent colour is reserved for actions and focus. Cyan is not used as a dominant wash."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card>
              <h3 className="type-h3">Card on dark</h3>
              <p className="type-body mt-3 text-muted">
                Surface, border, and muted text tokens invert with the section
                theme.
              </p>
            </Card>
            <Card>
              <h3 className="type-h3">Readable measure</h3>
              <p className="type-body mt-3 text-muted">
                Body copy stays within a comfortable line length on wide
                screens.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-section-light py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Light section"
            title="Shared primitives"
            description="Buttons, tags, cards, and screenshot frames share the same radius, spacing, and focus treatment."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <Card>
              <p className="type-meta mb-2">type-h1</p>
              <p className="type-h1">Heading one</p>
              <p className="type-meta mt-6 mb-2">type-h3</p>
              <p className="type-h3">Interface heading</p>
              <p className="type-meta mt-6 mb-2">type-small</p>
              <p className="type-small text-muted">
                Supporting copy and compact UI labels.
              </p>
            </Card>
            <ScreenshotFrame
              caption="Reserved media frame"
              metadata="No project screenshot yet"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
