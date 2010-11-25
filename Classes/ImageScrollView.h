@interface ImageScrollView : UIScrollView <UIScrollViewDelegate> {
    UIView *imageView;
    NSUInteger index;
}

@property (assign) NSUInteger index;

- (void)displayImage:(UIImage *)image;
- (void)displayTiledImageNamed:(NSString *)imageName size:(CGSize)imageSize;
- (void)setMaxMinZoomScalesForCurrentBounds;

- (CGPoint)pointToCenterAfterRotation;
- (CGFloat)scaleToRestoreAfterRotation;
- (void)restoreCenterPoint:(CGPoint)oldCenter scale:(CGFloat)oldScale;

@end
