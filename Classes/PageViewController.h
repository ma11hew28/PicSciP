@class ImageScrollView;

@interface PageViewController : UIViewController <UIScrollViewDelegate> {
    UIScrollView *pagingScrollView;
    
    NSMutableSet *recycledPages;
    NSMutableSet *visiblePages;

    // These values are stored before we start rotation so that
	// we adjust the content offset appropriately during rotation.
    int           firstVisiblePageIndexBeforeRotation;
    CGFloat       percentScrolledIntoFirstVisiblePage;
}

- (void)configurePage:(ImageScrollView *)page forIndex:(NSUInteger)index;
- (BOOL)isDisplayingPageForIndex:(NSUInteger)index;

- (CGRect)frameForPagingScrollView;
- (CGRect)frameForPageAtIndex:(NSUInteger)index;
- (CGSize)contentSizeForPagingScrollView;

- (void)tilePages;
- (ImageScrollView *)dequeueRecycledPage;

- (NSString *)imageNameAtIndex:(NSUInteger)index;
- (UIImage *)imageAtIndex:(NSUInteger)index;

@end
