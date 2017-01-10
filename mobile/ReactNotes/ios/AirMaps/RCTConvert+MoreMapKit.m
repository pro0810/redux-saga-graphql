//
// Created by Leland Richardson on 12/27/15.
// Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTConvert+MoreMapKit.h"
#import "AIRMapCoordinate.h"
#import "RCTConvert+CoreLocation.h"


@implementation RCTConvert (MoreMapKit)

// NOTE(lmr):
// This is a bit of a hack, but I'm using this class to simply wrap
// around a `CLLocationCoordinate2D`, since I was unable to figure out
// how to handle an array of structs like CLLocationCoordinate2D. Would love
// to get rid of this if someone can show me how...
+ (AIRMapCoordinate *)AIRMapCoordinate:(id)json
{
    AIRMapCoordinate *coord = [AIRMapCoordinate new];
    coord.coordinate = [self CLLocationCoordinate2D:json];
    return coord;
}

RCT_ARRAY_CONVERTER(AIRMapCoordinate)

+ (NSArray<NSArray<AIRMapCoordinate *> *> *)AIRMapCoordinateArrayArray:(id)json
{
    return RCTConvertArrayValue(@selector(AIRMapCoordinateArray:), json);
}

@end
