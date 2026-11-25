import { useRef, useState, type DragEvent } from 'react';
import { Loader2, TriangleAlert } from 'lucide-react';
import { ImageUp, Layers, ChevronLeft } from '../components/icons';
import { ActionBar } from '../components/composite';
import { coverImage } from '../components/composite/CourseCard/CourseCover';
import { coverToDataUrl } from '../lib/coverImage';
import { Button, Card, Input, Toggle } from '../components/core';
import { usePrototype, wait } from '../data/prototype';
import { COVER_MAX_MB, COVER_TYPES, DESCRIPTION_MAX, DESCRIPTION_MIN, validateDetails } from '../data/rules';
import { useToast } from '../app/toast';
import { useWizard } from '../features/wizard/useWizard';
import { WizardFrame } from '../features/wizard/WizardFrame';
import './pages.css';

type Upload = { state: 'idle' } | { state: 'uploading'; name: string } | { state: 'error'; reason: string };

/** 04 · Course Details, step 2 (Figma 251:2638) + Upload failed / Offline states */
export default function CourseDetails() {
  const { course, update, save, goTo, settings } = useWizard('details');
  const { set: setPrototype } = usePrototype();
  const toast = useToast();
  const [upload, setUpload] = useState<Upload>({ state: 'idle' });
  const [drag, setDrag] = useState(false);
  const [priceError, setPriceError] = useState<string>();
  const fileRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null);

  if (!course) return <WizardFrame step="details" course={course} save={save} goTo={goTo} back="/courses">{null}</WizardFrame>;

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    // F2 / U2: validate type and size, then "upload"
    if (!COVER_TYPES.includes(file.type)) {
      setUpload({ state: 'error', reason: `“${file.name}” isn’t a supported format. Use PNG, JPG or WebP.` });
      return;
    }
    if (file.size > COVER_MAX_MB * 1024 * 1024) {
      setUpload({ state: 'error', reason: `This file is ${(file.size / 1048576).toFixed(1)} MB. Covers can be up to ${COVER_MAX_MB} MB.` });
      return;
    }
    setUpload({ state: 'uploading', name: file.name });
    await wait(settings.latency + 400);
    if (settings.uploadFails || settings.offline) {
      setUpload({ state: 'error', reason: settings.offline ? 'You’re offline. Connect to upload your cover.' : 'Check your connection and try again.' });
      return;
    }
    update({ cover: { fileName: file.name, url: await coverToDataUrl(file) } });
    setUpload({ state: 'idle' });
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onContinue = () => {
    const e = validateDetails(course);
    setPriceError(e.price);
    if (e.price) {
      priceRef.current?.focus();
      return;
    }
    goTo('sessions');
  };

  const descLen = course.description.trim().length;
  const descHelper =
    descLen > 0 && descLen < DESCRIPTION_MIN
      ? `${course.description.length} / ${DESCRIPTION_MAX} characters · ${DESCRIPTION_MIN - descLen} more needed to publish`
      : `${course.description.length} / ${DESCRIPTION_MAX} characters`;

  return (
    <WizardFrame step="details" course={course} save={save} goTo={goTo} back={`/courses/${course.id}/basic`}>
      <div className="wizard-grid">
        <Card title="Course details" description="Tell students what they will learn and why it matters.">
          <Input
            label="Description"
            multiline
            value={course.description}
            onChange={(v) => update({ description: v })}
            placeholder="What is this course about, and who is it for?"
            maxLength={DESCRIPTION_MAX}
            helper={descHelper}
          />
          <Input
            label="What students will learn"
            multiline
            value={course.outcomes}
            onChange={(v) => update({ outcomes: v })}
            placeholder="Build clean layouts with grids and spacing"
            helper="Add one outcome per line"
          />
          <Input label="Requirements" value={course.requirements} onChange={(v) => update({ requirements: v })} placeholder="No prior design experience needed" />
        </Card>

        <div className="wizard-aside">
          <Card title="Course cover" description="Shown on the course page and cards.">
            {course.cover && upload.state === 'idle' ? (
              <div className="upload-preview">
                {coverImage(course) ? (
                  <img src={coverImage(course)} alt="Course cover preview" />
                ) : (
                  <div className="upload-preview__placeholder"><Layers aria-hidden /></div>
                )}
                <div className="upload-preview__bar">
                  <span className="upload-preview__name truncate" title={course.cover.fileName}>{course.cover.fileName}</span>
                  <Button appearance="outlined" intent="neutral" onClick={() => fileRef.current?.click()}>Replace</Button>
                  <Button appearance="outlined" intent="neutral" onClick={() => update({ cover: null })}>Remove</Button>
                </div>
              </div>
            ) : (
              <div
                className={[
                  'upload',
                  drag && 'upload--drag',
                  upload.state === 'error' && 'upload--error',
                  upload.state === 'uploading' && 'upload--busy',
                ].filter(Boolean).join(' ')}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={onDrop}
              >
                {upload.state === 'uploading' ? (
                  <>
                    <Loader2 className="upload__icon save-indicator__spin" aria-hidden />
                    <span className="upload__title" role="status">Uploading {upload.name}…</span>
                  </>
                ) : upload.state === 'error' ? (
                  <>
                    <TriangleAlert className="upload__icon" aria-hidden />
                    <span className="upload__title">Upload failed</span>
                    <span className="upload__hint" role="alert">{upload.reason}</span>
                    <span className="upload__title">Choose another file</span>
                  </>
                ) : (
                  <>
                    <ImageUp className="upload__icon" aria-hidden />
                    <span className="upload__title">Drag & drop or browse</span>
                    <span className="upload__hint">PNG, JPG or WebP, 1280×720, up to {COVER_MAX_MB} MB</span>
                  </>
                )}
                <input
                  className="upload__input"
                  type="file"
                  accept={COVER_TYPES.join(',')}
                  aria-label="Upload course cover"
                  disabled={upload.state === 'uploading'}
                  onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
                />
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              hidden
              accept={COVER_TYPES.join(',')}
              onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
            />
          </Card>

          <Card title="Pricing">
            <div className="setting-row">
              <div className="setting-row__text">
                <span className="setting-row__title" id="free-label">Free course</span>
                <span className="setting-row__hint" id="free-hint">Anyone can enroll at no cost</span>
              </div>
              <Toggle
                label="Free course"
                describedBy="free-hint"
                checked={course.isFree}
                onChange={(v) => { update({ isFree: v }); setPriceError(undefined); }}
              />
            </div>
            <Input
              ref={priceRef}
              label="Price"
              value={course.isFree ? '' : course.price}
              onChange={(v) => { update({ price: v.replace(/[^0-9.]/g, '') }); setPriceError(undefined); }}
              placeholder={course.isFree ? '$0.00' : 'e.g. 49'}
              disabled={course.isFree}
              inputMode="decimal"
              error={priceError}
              helper={course.isFree ? 'Turn off Free course to set a price' : 'Price in USD'}
            />
          </Card>
        </div>
      </div>

      <ActionBar
        start={<Button appearance="outlined" intent="neutral" leadingIcon={<ChevronLeft />} onClick={() => goTo('basic')} className="only-desktop">Back</Button>}
        end={
          <>
            <Button
              appearance="outlined"
              onClick={() => toast.show({ tone: settings.offline ? 'info' : 'success', message: settings.offline ? 'Saved on this device. It will sync when you’re online.' : 'Draft saved' })}
            >
              Save as draft
            </Button>
            <Button onClick={onContinue}>Continue</Button>
          </>
        }
        note={settings.offline ? (
          <>
            Changes will sync when you’re online.{' '}
            <button type="button" className="copy-btn" onClick={() => setPrototype({ offline: false })}>Try again</button>
          </>
        ) : undefined}
      />
    </WizardFrame>
  );
}
