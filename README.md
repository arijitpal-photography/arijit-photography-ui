# Arijit Photography Website

A professional photography portfolio website built with React and deployed on AWS S3 with CloudFront CDN.

## 🚀 Quick Start

```bash
# Clone the repository
git clone git@github.com:arijitpal-photography/arijit-photography-ui.git
cd arijit-photography-ui

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
arijit-photography-ui/
├── public/
│   ├── index.html
│   └── photos/           # Static images (JPGs, PNGs, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layout components
│   ├── pages/            # Individual page components
│   └── App.jsx           # Main app with routing
├── .github/workflows/
│   └── deploy.yaml       # CI/CD deployment pipeline
└── package.json
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ 
- Git
- AWS CLI (for deployment testing)
- GitHub account with SSH keys configured

### Environment Setup

1. **Configure Git SSH** (Recommended for large files):
   ```bash
   # Add SSH key to GitHub
   ssh-add ~/.ssh/id_ed25519__arijitpal-tech
   
   # Test connection
   ssh -T git@github.com
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development**:
   ```bash
   npm start          # Development server
   npm test           # Run tests
   npm run build      # Production build
   ```

## 🚀 Deployment Setup

### AWS Infrastructure

The website uses the following AWS services:
- **S3 Bucket**: `arijitpal-photography-static-site-s3` (static file storage)
- **CloudFront**: CDN for global content delivery
- **Route 53**: Custom domain management (if applicable)

### GitHub Actions CI/CD

The deployment is automated via GitHub Actions. To set up:

1. **Repository Secrets** (Settings → Secrets and variables → Actions):
   ```
   AWS_ACCESS_KEY_ID: Your AWS access key
   AWS_SECRET_ACCESS_KEY: Your AWS secret key
   AWS_REGION: us-east-1 (or your preferred region)
   ```

2. **Deployment Workflow** (`.github/workflows/deploy.yaml`):
   - Triggers on push to `main` branch
   - Builds the React application
   - Deploys to S3 bucket
   - CloudFront automatically serves updated content

### Manual Deployment (Optional)

For manual deployment without GitHub Actions:

```bash
# Build the project
npm run build

# Deploy to S3
aws s3 sync build/ s3://arijitpal-photography-static-site-s3 --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 📸 Managing Photos

### Adding New Photos

1. **Add to `public/photos/` directory**:
   ```bash
   # Copy photos to public folder
   cp /path/to/your/photo.jpg public/photos/
   
   # Commit changes
   git add public/photos/
   git commit -m "Add new photo: photo.jpg"
   git push
   ```

2. **Update Components**:
   - Import and reference new photos in React components
   - Use relative paths: `/photos/your-photo.jpg`

### Photo Guidelines

- **Format**: JPG for photos, PNG for graphics/logos
- **Size**: Optimize for web (max 2MB per image)
- **Naming**: Use descriptive names with hyphens (e.g., `sunset-beach.jpg`)
- **Thumbnails**: Create thumbnail versions for gallery views

## 🔧 Common Issues & Troubleshooting

### Issue 1: Changes Not Reflecting on Website

**Symptoms**: Code changes deployed but website shows old content

**Causes & Solutions**:
- **CloudFront Cache**: Invalidate CDN cache
  ```bash
  # AWS Console: CloudFront → Invalidations → Create
  # Or via CLI:
  aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
  ```
- **Browser Cache**: Hard refresh (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows)
- **Build Cache**: GitHub Actions might use cached dependencies

### Issue 2: Git Push Fails with Large Files

**Symptoms**: `git push` fails or is very slow with large images

**Solutions**:
- **Use SSH instead of HTTPS**:
  ```bash
  git remote set-url origin git@github.com:arijitpal-photography/arijit-photography-ui.git
  ```
- **Optimize Images**: Compress images before adding
- **Use Git LFS** (if frequently adding large files):
  ```bash
  git lfs track "*.jpg"
  git lfs track "*.png"
  ```

### Issue 3: Deployment Fails

**Symptoms**: GitHub Actions workflow fails

**Common Causes**:
- **AWS Credentials**: Verify secrets are correct
- **Build Errors**: Check `npm run build` locally first
- **S3 Permissions**: Ensure AWS credentials have S3 write access

**Debugging Steps**:
1. Check GitHub Actions logs
2. Run `npm run build` locally
3. Test AWS credentials manually

### Issue 4: Photos Not Loading

**Symptoms**: Images show broken or don't load

**Solutions**:
- **Check File Paths**: Ensure photos are in `public/photos/`
- **Verify Case Sensitivity**: Use exact case in file references
- **Check S3 Sync**: Confirm files were uploaded to S3
- **Clear CDN Cache**: Invalidate CloudFront

### Issue 5: Development Server Issues

**Symptoms**: `npm start` fails or shows errors

**Solutions**:
- **Clear Node Modules**:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- **Check Node Version**: Ensure Node.js 16+
- **Port Conflicts**: Kill processes on port 3000

## 🔄 Maintenance Tasks

### Regular Maintenance

1. **Monthly**:
   - Update dependencies: `npm update`
   - Check for security vulnerabilities: `npm audit`

2. **Quarterly**:
   - Review AWS costs and usage
   - Update Node.js version if needed
   - Backup important photos

3. **Annually**:
   - Renew SSL certificates (if using custom domain)
   - Review and update AWS IAM permissions

### Performance Optimization

- **Image Optimization**: Compress photos before upload
- **Bundle Analysis**: Use `npm run build -- --analyze` to check bundle size
- **CDN Settings**: Review CloudFront caching policies

## 📞 Support & Resources

### Useful Links
- [GitHub Repository](https://github.com/arijitpal-photography/arijit-photography-ui)
- [AWS S3 Console](https://console.aws.amazon.com/s3/)
- [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
- [React Documentation](https://reactjs.org/)

### Getting Help
- Check GitHub Issues for common problems
- Review AWS CloudWatch logs for deployment issues
- Use browser DevTools for frontend debugging

## 📄 License

This project is private and proprietary to Arijit Photography.

---

**Last Updated**: January 2026
