# OrderResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**orderCode** | **string** |  | [optional] [default to undefined]
**userId** | **number** |  | [optional] [default to undefined]
**userName** | **string** |  | [optional] [default to undefined]
**branchId** | **number** |  | [optional] [default to undefined]
**branchName** | **string** |  | [optional] [default to undefined]
**orderDate** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**totalAmount** | **number** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**items** | [**Array&lt;OrderItemResponse&gt;**](OrderItemResponse.md) |  | [optional] [default to undefined]
**payment** | [**PaymentResponse**](PaymentResponse.md) |  | [optional] [default to undefined]
**shipment** | [**ShipmentResponse**](ShipmentResponse.md) |  | [optional] [default to undefined]
**promotionCodes** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { OrderResponse } from './api';

const instance: OrderResponse = {
    id,
    orderCode,
    userId,
    userName,
    branchId,
    branchName,
    orderDate,
    status,
    totalAmount,
    notes,
    items,
    payment,
    shipment,
    promotionCodes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
