# Image Optimization Guide - URGENT

## Critical Issue: 2.2MB Hero Image

Your hero background image `regulatory_visual_anchor.png` is **2,200,781 bytes (2.2MB)** and is blocking page load performance.

---

## Immediate Action Required

### Step 1: Compress the Image

**Option A: Online Tools (Easiest)**

1. **Squoosh.app** (Recommended)
   - Go to https://squoosh.app
   - Upload `mevoq-nextjs/public/images/regulatory_visual_anchor.png`
   - Select **WebP** format
   - Set quality to **75-80%**
   - Enable **Resize** to max width: 1920px
   - Download and replace original

2. **TinyPNG**
   - Go to https://tinypng.com
   - Upload the PNG
   - Download compressed version
   - Then convert to WebP using Squoosh

**Option B: Command Line (Fastest)**

```bash
# Install sharp-cli
npm install -g sharp-cli

# Navigate to images directory
cd mevoq-nextjs/public/images

# Convert and compress to WebP
sharp -i regulatory_visual_anchor.png -o regulatory_visual_anchor.webp --webp-quality 75 --resize 1920

# Verify file size (should be <200KB)
ls -lh regulatory_visual_anchor.webp
```

**Option C: Photoshop/GIMP**
1. Open image
2. Image → Image Size → Set width to 1920px
3. File → Export As → WebP
4. Quality: 75-80%
5. Save

---

### Step 2: Update the Code

The code has already been updated to use quality optimization:

```javascript
// app/components/HeroBackground.js
<Image
    src="/images/regulatory_visual_anchor.png"  // Change to .webp after conversion
    alt="Regulatory Process Schematic"
    fill
    quality={75}  // ✅ Already added
    sizes="100vw"  // ✅ Already added
    priority
/>
```

**After you compress the image:**
1. Replace the old PNG with the new WebP file
2. Update the src path to `.webp` extension
3. Keep the old PNG as fallback (Next.js will handle this)

---

### Step 3: Create Responsive Versions (Optional but Recommended)

For even better performance, create 3 sizes:

```bash
# Mobile (640px)
sharp -i regulatory_visual_anchor.png -o regulatory_visual_anchor-mobile.webp --webp-quality 75 --resize 640

# Tablet (1024px)
sharp -i regulatory_visual_anchor.png -o regulatory_visual_anchor-tablet.webp --webp-quality 75 --resize 1024

# Desktop (1920px)
sharp -i regulatory_visual_anchor.png -o regulatory_visual_anchor-desktop.webp --webp-quality 75 --resize 1920
```

Then update the component:

```javascript
<Image
    src="/images/regulatory_visual_anchor-desktop.webp"
    alt="Regulatory Process Schematic"
    fill
    quality={75}
    priority
    sizes="100vw"
    // Next.js will automatically serve the right size
/>
```

---

## Other Images to Optimize

### Current Image Sizes:
```
regulatory_visual_anchor.png: 2,200,781 bytes → Target: <200KB (90% reduction)
penicillin_structure.png: 493,286 bytes → Target: <100KB
molecular_fragment.png: 401,979 bytes → Target: <80KB
molecular_fragment_v2.png: 334,728 bytes → Target: <70KB
aspirin_bg.png: 266,661 bytes → Target: <60KB
penicillin_structure_v2.png: 112,772 bytes → ✅ Already good
```

### Batch Conversion Script

A batch optimization script is available at `mevoq-nextjs/scripts/optimize-images.js`. It handles PNG, JPG, and JPEG files, skips already-converted images, and provides detailed progress output.
Run it:
```bash
npm install sharp
node mevoq-nextjs/scripts/optimize-images.js
```

---

## Expected Results

### Before:
- Hero image: 2.2MB
- Total page weight: ~3MB
- LCP: 4-6 seconds
- Lighthouse Performance: 40-60

### After:
- Hero image: <200KB (WebP)
- Total page weight: ~500KB
- LCP: 1.5-2.5 seconds
- Lighthouse Performance: 85-95

**Bandwidth savings: 85-90%**
**Load time improvement: 50-70%**

---

## Verification

After optimization, test with:

```bash
# Check file sizes
ls -lh mevoq-nextjs/public/images/*.webp

# Run Lighthouse audit
npx lighthouse https://your-site.com --view

# Check in browser DevTools
# Network tab → Img filter → Check sizes
```

---

## Next.js Image Component Benefits

The Next.js Image component (already implemented) provides:

✅ Automatic format selection (WebP/AVIF)
✅ Responsive image sizing
✅ Lazy loading (except priority images)
✅ Blur placeholder support
✅ CDN optimization on Vercel

All you need to do is provide optimized source images!

---

## Quick Reference

**Recommended Image Formats:**
- Photos/Complex: WebP (75-80% quality)
- Simple Graphics: SVG (if possible)
- Fallback: Optimized PNG

**Recommended Sizes:**
- Hero images: 1920px wide max
- Content images: 1200px wide max
- Thumbnails: 400px wide max

**Quality Settings:**
- Hero backgrounds: 75%
- Content images: 80%
- Thumbnails: 85%

---

## Status

- [x] Code updated with quality and sizes props
- [x] 'use client' removed from HeroBackground
- [x] External CDN texture replaced with inline SVG
- [ ] **URGENT: Compress regulatory_visual_anchor.png to WebP**
- [ ] Compress other large images
- [ ] Create responsive image variants
- [ ] Test with Lighthouse

**Priority: Compress the hero image TODAY for immediate 50%+ performance improvement!**
