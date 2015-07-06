# 问题：
# 一个棋盘有 8*8=64 个格子，编号 (1,1), (1,2), …… (8,8)。 “马”按照“日”字走法 从指定
# 起点跳到指定终点，写一程序求最短路径需要几步。例如，从(1,1)点跳到 (4,4)点至少要
# 两步，一种方式为 (1,1) -> (2,3) -> (4,4)。程序接受４个 1-8 之间整数，表示起点和
# 终点位置，计算出最短路径需要几步。
#
#
# 解题思路：
# 采用广度优先搜索算法逐步增加步数，如果此过程中到达终点，便是最短步数
#
# 运行方式：
# ruby ./alg2.rb 1 1 4 4

N = 8 # 棋盘格子数

# (x0, y0): 起点
# (xn, yn): 终点
# 最短步数或-1(终点不可达)
def shortest_path_steps(x0, y0, xn, yn)
  puts "起点: (#{x0}, #{y0})"
  puts "终点: (#{xn}, #{yn})"

  paths = [[x0, y0, 0]]

  while paths.length > 0
    p = paths.shift

    if reach_end_pt?(p[0], p[1], xn, yn)
      return p[2]
    end

    paths.concat(next_steps(p[0], p[1], p[2]))
  end

  -1
end

# 判断一个点(x, y)是否是终点(xn, yn)
def reach_end_pt?(x, y, xn, yn)
  x == xn && y == yn
end

# 点(x, y)是否有效
def valid_pt?(x, y)
  1 <= x && x <= N && 1 <= y && y <= N
end

# 由点(x, y)出发，下一步能到达的所有点
# 返回：[[x1, y1, nl], [x2, y2, nl], ..., [xn, yn, nl]]
def next_steps(x, y, level)
  result = []
  next_level = level + 1

  result << [x + 1, y - 2, next_level] if valid_pt?(x + 1, y - 2)
  result << [x + 2, y - 1, next_level] if valid_pt?(x + 2, y - 1)
  result << [x + 2, y + 1, next_level] if valid_pt?(x + 2, y + 1)
  result << [x + 1, y + 2, next_level] if valid_pt?(x + 1, y + 2)

  result << [x - 1, y - 2, next_level] if valid_pt?(x - 1, y - 2)
  result << [x - 2, y - 1, next_level] if valid_pt?(x - 2, y - 1)
  result << [x - 2, y + 1, next_level] if valid_pt?(x - 2, y + 1)
  result << [x - 1, y + 2, next_level] if valid_pt?(x - 1, y + 2)

  result
end

n = shortest_path_steps(ARGV[0].to_i, ARGV[1].to_i, ARGV[2].to_i, ARGV[3].to_i)
puts "最短步数: #{n}"
