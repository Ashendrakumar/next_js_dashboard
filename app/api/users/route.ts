// app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromCookie } from "@/lib/auth";
import { UsersListResponse } from "@/types/user";
import { MOCK_USERS } from "@/lib/constants";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersListResponse>> {
  try {
    // Verify authentication
    const cookieHeader = request.headers.get("cookie");
    const token = getTokenFromCookie(cookieHeader);

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
          error: "Unauthorized: Invalid or missing token",
        },
        { status: 401 },
      );
    }

    // Parse query parameters
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "name";
    const order = (searchParams.get("order") || "asc") as "asc" | "desc";

    // Filter users by search term
    let filteredUsers = [...MOCK_USERS];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    // Sort users
    filteredUsers.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortBy) {
        case "id":
          aValue = a.id;
          bValue = b.id;
          break;
        case "email":
          aValue = a.email;
          bValue = b.email;
          break;
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "name":
        default:
          aValue = a.name;
          bValue = b.name;
          break;
      }

      // Compare values
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;

      return order === "asc" ? comparison : -comparison;
    });

    // Paginate
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        data: paginatedUsers,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        error: "An error occurred while fetching users",
      },
      { status: 500 },
    );
  }
}
