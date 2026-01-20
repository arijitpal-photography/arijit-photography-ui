# Arijit Photography Website - Runbook

This runbook provides step-by-step procedures for setting up, maintaining, and troubleshooting the Arijit Photography website.

## 🚀 Initial Setup

### 1. Repository Setup

#### Prerequisites
- GitHub account with appropriate permissions
- SSH keys configured for GitHub
- Node.js 16+ installed locally
- AWS account with appropriate permissions

#### Step-by-Step Setup

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:arijitpal-photography/arijit-photography-ui.git
   cd arijit-photography-ui
   ```

2. **Verify Git Configuration**:
   ```bash
   # Check current remote
   git remote -v
   
   # Should show SSH URL
   # origin  git@github.com:arijitpal-photography/arijit-photography-ui.git (fetch)
   # origin  git@github.com:arijitpal-photography/arijit-photography-ui.git (push)
   
   # If HTTPS, convert to SSH
   git remote set-url origin git@github.com:arijitpal-photography/arijit-photography-ui.git
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Verify Development Setup**:
   ```bash
   npm start
   # Should open http://localhost:3000
   ```

### 2. AWS Infrastructure Setup

#### S3 Bucket Configuration

1. **Create S3 Bucket** (if not exists):
   ```bash
   # Via AWS Console
   # Bucket name: arijitpal-photography-static-site-s3
   # Region: us-east-1 (or preferred)
   # Block public access: Off (for static website)
   # Static website hosting: Enabled
   ```

2. **Configure S3 Bucket Policy**:
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::arijitpal-photography-static-site-s3/*"
           }
       ]
   }
   ```

#### CloudFront Distribution Setup

1. **Create CloudFront Distribution**:
   - Origin domain: S3 bucket endpoint
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Default root object: index.html
   - Custom error responses: 403 → 200, /index.html

2. **Configure Cache Behavior**:
   - Cache TTL: 1 day for static assets
   - Cache TTL: 0 for HTML files

### 3. GitHub Actions Setup

#### Configure Repository Secrets

1. **Navigate to GitHub Repository**:
   - Go to Settings → Secrets and variables → Actions

2. **Add Required Secrets**:
   ```
   AWS_ACCESS_KEY_ID: [Your AWS Access Key]
   AWS_SECRET_ACCESS_KEY: [Your AWS Secret Key]
   AWS_REGION: us-east-1
   ```

#### Creating/Recovering AWS Credentials

**If you need to create new AWS credentials:**

1. **Sign in to AWS Console**: https://console.aws.amazon.com/

2. **Navigate to IAM Service**:
   - In the search bar, type "IAM" and select it
   - Or go to: https://console.aws.amazon.com/iam/

3. **Create New IAM User** (if needed):
   - Click "Users" in the left sidebar
   - Click "Create user"
   - Enter username: "arijitpalphotography-admin" (or similar)
   - Select "Attach policies directly"
   - Add these policies:
     - `AmazonS3FullAccess` (or more restrictive S3 policy)
     - `CloudFrontFullAccess` (or more restrictive CloudFront policy)
   - Click "Next" → "Create user"

4. **Generate Access Keys**:
   - Click on the newly created user
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Select "Command Line Interface (CLI)" as use case
   - Check "I understand the above recommendation"
   - Click "Next"
   - Add description: "GitHub Actions deployment"
   - Click "Create access key"

5. **Save Credentials**:
   - **IMPORTANT**: Copy both the Access key ID and Secret access key
   - Store them securely (password manager, encrypted file)
   - You won't be able to see the secret key again

6. **Add to GitHub Secrets**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add `AWS_ACCESS_KEY_ID` with the Access key ID
   - Add `AWS_SECRET_ACCESS_KEY` with the Secret access key
   - Add `AWS_REGION` with your preferred region (e.g., `us-east-1`)

**If you lost existing credentials:**

1. **Deactivate Old Keys**:
   - Go to IAM → Users → [Your username]
   - Security credentials → Access keys
   - Find the old key and click "Deactivate"

2. **Create New Keys**:
   - Follow steps 4-6 above to create new access keys

3. **Update GitHub Secrets**:
   - Replace the old secrets in GitHub repository settings

#### Alternative: Using IAM Roles (More Secure)

For better security, consider using IAM roles instead of access keys:

1. **Create OIDC Provider for GitHub**:
   ```bash
   # Via AWS CLI
   aws iam create-open-id-connect-provider \
     --url https://token.actions.githubusercontent.com \
     --client-id-list sts.amazonaws.com \
     --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
   ```

2. **Create IAM Role**:
   - Create role with trust relationship for GitHub Actions
   - Attach necessary S3 and CloudFront policies
   - Update GitHub Actions to use role instead of access keys

#### Verify Deployment Workflow

1. **Check Workflow File**:
   ```bash
   cat .github/workflows/deploy.yaml
   ```

2. **Test Deployment**:
   ```bash
   # Make a small change
   echo "test" > test.txt
   git add test.txt
   git commit -m "Test deployment"
   git push
   
   # Monitor GitHub Actions
   # Remove test file after successful deployment
   git rm test.txt
   git commit -m "Remove test file"
   git push
   ```

## 📸 Photo Management Procedures

### Adding New Photos

1. **Prepare Photos**:
   ```bash
   # Optimize images (recommended max 2MB)
   # Create thumbnails for gallery views
   # Use descriptive names with hyphens
   ```

2. **Add to Repository**:
   ```bash
   # Copy photos to public directory
   cp /path/to/photo.jpg public/photos/
   
   # Stage and commit
   git add public/photos/
   git commit -m "Add new photo: photo.jpg"
   git push
   ```

3. **Update Components**:
   ```jsx
   // Import in React component
   import photoImage from '/photos/photo.jpg';
   
   // Use in component
   <Image src={photoImage} alt="Description" />
   ```

### Photo Organization

```
public/photos/
├── home-background.jpg      # Homepage hero image
├── your-photo.jpg          # About page profile
├── landscape-thumb.jpg      # Landscape category thumbnail
├── cities-thumb.jpg        # Cityscape category thumbnail
├── wildlife-thumb.jpg      # Wildlife category thumbnail
├── travel-thumb.jpg        # Travel category thumbnail
├── aerials-thumb.jpg       # Aerial category thumbnail
├── patterns-thumb.jpg      # Patterns category thumbnail
├── website-logo.png        # Site logo
└── favicon.png            # Site favicon
```

## 🔄 Deployment Procedures

### Automated Deployment (Standard)

1. **Make Changes**:
   ```bash
   # Edit code or add photos
   # Stage changes
   git add .
   
   # Commit with descriptive message
   git commit -m "Update About page content"
   
   # Push to trigger deployment
   git push
   ```

2. **Monitor Deployment**:
   - Go to GitHub Actions tab
   - Check workflow status
   - Review logs if failed

3. **Verify Deployment**:
   - Wait for workflow completion (usually 2-5 minutes)
   - Visit website to verify changes
   - If changes not visible, invalidate CDN cache

### Manual Deployment (Emergency)

1. **Build Locally**:
   ```bash
   npm run build
   ```

2. **Deploy to S3**:
   ```bash
   aws s3 sync build/ s3://arijitpal-photography-static-site-s3 --delete
   ```

3. **Invalidate CDN**:
   ```bash
   # Get distribution ID first
   aws cloudfront list-distributions
   
   # Invalidate all files
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

## 🔧 Troubleshooting Procedures

### Issue 1: Changes Not Reflecting

**Symptoms**: Website shows old content after deployment

**Debugging Steps**:
1. **Check Deployment Status**:
   ```bash
   # Verify latest commit is deployed
   git log --oneline -1
   # Compare with GitHub Actions timestamp
   ```

2. **Clear Browser Cache**:
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Open in incognito/private mode
   - Clear browser cache completely

3. **Invalidate CDN Cache**:
   ```bash
   # AWS Console: CloudFront → Invalidations → Create
   # Enter "/*" to invalidate all files
   # Wait 5-10 minutes for completion
   ```

4. **Verify S3 Contents**:
   ```bash
   aws s3 ls s3://arijitpal-photography-static-site-s3
   # Check if new files are present
   ```

### Issue 2: Deployment Failure

**Symptoms**: GitHub Actions workflow fails

**Debugging Steps**:
1. **Check GitHub Actions Logs**:
   - Go to Actions tab in GitHub
   - Click on failed workflow
   - Review error messages

2. **Common Issues**:
   - **AWS Credentials**: Verify secrets are correct
   - **Build Errors**: Run `npm run build` locally
   - **Node Version**: Ensure Node.js 16+ is used

3. **Fix and Retry**:
   ```bash
   # Test build locally
   npm run build
   
   # If successful, push a new commit to retry
   git commit --allow-empty -m "Retry deployment"
   git push
   ```

### Issue 3: Git Push Problems

**Symptoms**: `git push` fails or is slow

**Debugging Steps**:
1. **Check Remote URL**:
   ```bash
   git remote -v
   # Should use SSH, not HTTPS
   ```

2. **Convert to SSH if Needed**:
   ```bash
   git remote set-url origin git@github.com:arijitpal-photography/arijit-photography-ui.git
   ```

3. **Test SSH Connection**:
   ```bash
   ssh -T git@github.com
   # Should show successful authentication
   ```

4. **Optimize Large Files**:
   ```bash
   # Compress images before adding
   # Consider Git LFS for very large files
   git lfs track "*.jpg"
   git lfs track "*.png"
   ```

### Issue 4: Photos Not Loading

**Symptoms**: Images show broken or missing

**Debugging Steps**:
1. **Check File Paths**:
   ```bash
   # Verify files exist in public/photos/
   ls -la public/photos/
   
   # Check case sensitivity in imports
   grep -r "photos/" src/
   ```

2. **Verify S3 Upload**:
   ```bash
   aws s3 ls s3://arijitpal-photography-static-site-s3/photos/
   ```

3. **Check Build Output**:
   ```bash
   npm run build
   # Check if photos are copied to build/
   ls -la build/photos/
   ```

4. **Clear CDN Cache**:
   - Invalidate CloudFront cache
   - Wait for propagation

## 🔧 Maintenance Procedures

### Daily Checks

1. **Monitor Website**:
   - Visit main pages
   - Check photo loading
   - Verify navigation

2. **Check GitHub Actions**:
   - Review recent deployments
   - Look for any failures

### Weekly Tasks

1. **Update Dependencies**:
   ```bash
   npm update
   npm audit fix
   git commit package-lock.json -m "Update dependencies"
   git push
   ```

2. **Review AWS Costs**:
   - Check S3 storage usage
   - Review CloudFront data transfer
   - Monitor for unusual activity

### Monthly Tasks

1. **Security Updates**:
   ```bash
   npm audit
   # Address any high/critical vulnerabilities
   ```

2. **Performance Review**:
   - Check website load times
   - Analyze bundle size: `npm run build -- --analyze`
   - Optimize images if needed

3. **Backup Important Photos**:
   - Download original photos from S3
   - Verify backup integrity

### Quarterly Tasks

1. **Update Node.js Version**:
   ```bash
   # Check current version
   node --version
   
   # Update if needed (check compatibility)
   nvm install 18
   nvm use 18
   npm install
   ```

2. **Review AWS IAM Permissions**:
   - Audit user permissions
   - Remove unused access keys
   - Update password policies

3. **Domain and SSL Review**:
   - Check domain expiration
   - Verify SSL certificate validity
   - Update DNS records if needed

## 🚨 Emergency Procedures

### Website Down

1. **Check GitHub Actions**:
   - Recent deployment failures?
   - Rollback to previous working commit

2. **Check AWS Services**:
   - S3 bucket status
   - CloudFront distribution health
   - Route 53 DNS resolution

3. **Quick Rollback**:
   ```bash
   # Find last working commit
   git log --oneline -10
   
   # Rollback
   git revert HEAD
   git push
   ```

### Accidental Data Loss

1. **S3 Version Recovery**:
   - Check S3 versioning if enabled
   - Restore previous versions

2. **Git Repository Recovery**:
   ```bash
   # Find lost commit
   git reflog
   
   # Restore lost branch
   git checkout -b recovery COMMIT_HASH
   ```

### Security Incident

1. **Rotate AWS Credentials**:
   - Update GitHub secrets
   - Rotate IAM access keys
   - Review recent AWS activity

2. **Audit GitHub Access**:
   - Review repository collaborators
   - Check for unauthorized SSH keys
   - Enable two-factor authentication

## 📞 Contact Information

### Key Resources
- **GitHub Repository**: https://github.com/arijitpal-photography/arijit-photography-ui
- **AWS Console**: https://console.aws.amazon.com/
- **Domain Registrar**: [Your domain provider]
- **SSL Provider**: [Your SSL certificate provider]

### Emergency Contacts
- **AWS Support**: For AWS service issues
- **GitHub Support**: For repository access problems
- **Domain Provider**: For DNS/SSL issues

---

**Runbook Version**: 1.0  
**Last Updated**: January 2026  
**Next Review**: April 2026
