"use client";

import * as React from "react";
import { ResourcePage } from "@neton/application-front-resource";

/**
 * 兑换记录，即权益凭证。只读：本阶段由人工看「谁兑了什么」并在别处交付；
 * 标记已使用/作废是消费方系统的事，将来给它设计 API，而不是在这里加一个状态下拉。
 */
export default function Page() {
  return (
    <ResourcePage
      config={{
        resourceKey: "benefit-redemption",
        eyebrow: "BENEFIT",
        title: "兑换记录",
        description: "每条记录就是一张权益凭证。名称与积分是兑换时的快照，后台改价不影响历史。",
        endpoint: "/benefit/redemption",
        listPath: "page",
        readOnly: true,
        permissions: { page: "benefit:redemption:list" },
        fields: [
          { key: "id", label: "凭证 ID", format: "mono" },
          // userId / status 各出现两次：filter:true 的一份只进筛选框，
          // 不带 filter 的一份才会出现在表格列(见 front-resource 的既有约定：
          // filterFields 与 tableFields 各自独立从 fields 里挑,filter:true 的条目
          // 永远不进表格)。这页存在的意义就是「谁兑了什么」,用户 ID 只能筛不能看
          // 等于白做。key 相同没有冲突：这两个列表互不重叠,只读页也没有编辑表单
          // 会因重复 key 而混淆。
          { key: "userId", label: "用户 ID", format: "mono", filter: true },
          { key: "userId", label: "用户 ID", format: "mono" },
          { key: "redeemedAt", label: "兑换时间", format: "date" },
          { key: "itemId", label: "权益 ID", format: "mono", filter: true },
          { key: "itemName", label: "权益" },
          { key: "pointCost", label: "扣除积分", type: "number" },
          { key: "status", label: "状态", type: "select", filter: true,
            options: [{ label: "已获得", value: 1 }, { label: "已使用", value: 2 }, { label: "已作废", value: 3 }] },
          // 数字原样显示（1/2/3）；上面筛选下拉里已经写明对应含义。
          { key: "status", label: "状态" },
          { key: "pointRecordId", label: "积分流水 ID", format: "mono" },
        ],
      }}
    />
  );
}
